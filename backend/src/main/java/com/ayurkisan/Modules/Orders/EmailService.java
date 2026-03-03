package com.ayurkisan.Modules.Orders;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Async
    public void sendOrderConfirmation(String toEmail, Order order) {
        if (toEmail == null || toEmail.isEmpty()) {
            return;
        }

        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(toEmail);
            message.setSubject("Order Confirmation - Ayurkisan");
            
            StringBuilder body = new StringBuilder();
            body.append("Dear ").append(order.getUserName()).append(",\n\n");
            body.append("Thank you for your order! Your order has been placed successfully.\n\n");
            body.append("Order ID: ").append(order.getId()).append("\n");
            body.append("Payment Method: ").append(order.getPaymentMethod()).append("\n");
            body.append("Total Amount: ₹").append(order.getTotalDiscountedPrice()).append("\n\n");
            
            body.append("Items Ordered:\n");
            for (OrderItem item : order.getItems()) {
                body.append("- ").append(item.getProductName())
                    .append(" (Qty: ").append(item.getQuantity()).append(")")
                    .append(" - ₹").append(item.getTotalItemPrice()).append("\n");
            }

            body.append("\nShipping Address:\n").append(order.getShippingAddress()).append("\n\n");
            body.append("We will notify you once your order is shipped.\n\n");
            body.append("Best Regards,\nAyurkisan Team");

            message.setText(body.toString());
            mailSender.send(message);

        } catch (Exception e) {
            // Log error but don't stop the order placement flow
            System.err.println("Failed to send email to " + toEmail + ": " + e.getMessage());
        }
    }

    @Async
    public void sendOrderCancellation(String toEmail, Order order) {
        if (toEmail == null || toEmail.isEmpty()) {
            return;
        }

        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(toEmail);
            message.setSubject("Order Cancelled - Ayurkisan");
            
            String body = "Dear " + order.getUserName() + ",\n\n" +
                          "Your order (ID: " + order.getId() + ") has been successfully cancelled.\n" +
                          "If you have already paid online, the refund process will be initiated shortly.\n\n" +
                          "Best Regards,\nAyurkisan Team";

            message.setText(body);
            mailSender.send(message);

        } catch (Exception e) {
            System.err.println("Failed to send email to " + toEmail + ": " + e.getMessage());
        }
    }
}
