package com.ayurkisan.Modules.Orders;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.ayurkisan.Modules.Cart.Cart;
import com.ayurkisan.Modules.Cart.CartService;
import com.ayurkisan.model.Customer;
import com.ayurkisan.model.Product;
import com.ayurkisan.model.Retailer;
import com.ayurkisan.repository.CustomerRepository;
import com.ayurkisan.repository.RetailerRepository;
import com.ayurkisan.service.ProductService;
import com.ayurkisan.Modules.Packages.ProductPackageService;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CartService cartService;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private RetailerRepository retailerRepository;

    @Autowired
    private ProductService productService;

    @Autowired
    private ProductPackageService packageService;

    @Autowired
    private EmailService emailService;

    @Transactional
    public Order placeOrder(String userId, String role, String paymentMethod) {

        // 1. Fetch Cart
        Cart cart = cartService.getCart(userId, role);
        if (cart.getItems() == null || cart.getItems().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cannot place order: Cart is empty");
        }

        // 2. Auto-fetch User Details based on role
        String userName = "";
        String email = "";
        String phone = "";
        String address = "";

        if ("Customer".equalsIgnoreCase(role)) {
            Customer customer = customerRepository.findById(userId)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Customer not found"));
            userName = customer.getName();
            email = customer.getEmail();
            phone = customer.getPhoneNumber();
            address = customer.getAddress();
        } else if ("Retailer".equalsIgnoreCase(role)) {
            Retailer retailer = retailerRepository.findById(userId)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Retailer not found"));
            userName = retailer.getRetailerName();
            email = retailer.getEmail();
            phone = retailer.getPhoneNumber();
            address = retailer.getAddress();
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid role: " + role);
        }

        // 3. Create Order Object
        Order order = new Order();
        order.setUserId(userId);
        order.setRole(role);
        order.setUserName(userName);
        order.setContactEmail(email);
        order.setContactPhone(phone);
        order.setShippingAddress(address);

        order.setTotalOriginalPrice(cart.getTotalOriginalPrice());
        order.setTotalDiscountedPrice(cart.getTotalDiscountedPrice());

        order.setPaymentMethod(paymentMethod);
        if ("COD".equalsIgnoreCase(paymentMethod)) {
            order.setPaymentStatus("PENDING");
        } else {
            order.setPaymentStatus("PENDING"); // Online logic to be handled via gateway later
        }

        order.setOrderStatus("PLACED");

        // Convert CartItems to OrderItems
        List<OrderItem> orderItems = cart.getItems().stream().map(cartItem -> {
            OrderItem oi = new OrderItem();
            oi.setProductId(cartItem.getProductId());
            oi.setProductName(cartItem.getProductName());
            oi.setProductImage(cartItem.getProductImage());
            oi.setItemType(cartItem.getItemType());
            oi.setQuantity(cartItem.getQuantity());
            oi.setPrice(cartItem.getPrice());
            oi.setDiscountedPrice(cartItem.getDiscountedPrice());
            oi.setTotalItemPrice(cartItem.getTotalItemPrice());
            return oi;
        }).collect(Collectors.toList());

        order.setItems(orderItems);

        // 4. Reduce Stock Atomically (Throws exception if stock unavailable)
        for (OrderItem item : orderItems) {
            if ("PRODUCT".equalsIgnoreCase(item.getItemType())) {
                Product product = productService.getProductById(item.getProductId());
                boolean success = productService.reduceStockAtomically(product.getId(), item.getQuantity());
                if (!success) {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Insufficient stock for " + item.getProductName());
                }
            } else if ("PACKAGE".equalsIgnoreCase(item.getItemType())) {
                // packageService.reduceStockAtomically(item.getProductId(), item.getQuantity()); // Implement in PackageService if exists
            }
        }

        // 5. Save Order
        Order savedOrder = orderRepository.save(order);

        // 6. Clear Cart
        cartService.clearCart(userId);

        // 7. Send Email asynchronously
        emailService.sendOrderConfirmation(email, savedOrder);

        return savedOrder;
    }

    public List<Order> getUserOrders(String userId) {
        return orderRepository.findByUserId(userId);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @Transactional
    public Order cancelOrder(String orderId, String userId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Order not found"));

        if (!order.getUserId().equals(userId) && !"Admin".equalsIgnoreCase(userId)) { // Simple auth check
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Not authorized to cancel this order");
        }

        if ("DELIVERED".equalsIgnoreCase(order.getOrderStatus()) || "CANCELLED".equalsIgnoreCase(order.getOrderStatus())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Order cannot be cancelled in status: " + order.getOrderStatus());
        }

        // Add back physical stock
        for (OrderItem item : order.getItems()) {
            if ("PRODUCT".equalsIgnoreCase(item.getItemType())) {
                Product product = productService.getProductById(item.getProductId());
                productService.increaseStock(product.getId(), item.getQuantity());
            } else if ("PACKAGE".equalsIgnoreCase(item.getItemType())) {
                // packageService.increaseStock(item.getProductId(), item.getQuantity());
            }
        }

        order.setOrderStatus("CANCELLED");
        Order savedOrder = orderRepository.save(order);

        emailService.sendOrderCancellation(order.getContactEmail(), savedOrder);

        return savedOrder;
    }

    public Order updateOrderStatus(String orderId, String newStatus) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Order not found"));

        order.setOrderStatus(newStatus);
        
        if ("SHIPPED".equalsIgnoreCase(newStatus)) {
            order.setShippedAt(java.time.LocalDateTime.now());
        } else if ("DELIVERED".equalsIgnoreCase(newStatus)) {
            order.setDeliveredAt(java.time.LocalDateTime.now());
        }

        return orderRepository.save(order);
    }
}
