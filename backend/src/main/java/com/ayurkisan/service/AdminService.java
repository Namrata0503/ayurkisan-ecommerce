package com.ayurkisan.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ayurkisan.exception.CustomException;
import com.ayurkisan.model.Customer;
import com.ayurkisan.model.Retailer;
import com.ayurkisan.repository.CustomerRepository;
import com.ayurkisan.repository.RetailerRepository;

@Service
public class AdminService {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private RetailerRepository retailerRepository;

    // ================= VIEW ALL CUSTOMERS =================
    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    // ================= VIEW ALL RETAILERS =================
    public List<Retailer> getAllRetailers() {
        return retailerRepository.findAll();
    }

    // ================= RECOVER CUSTOMER =================
    public String recoverCustomer(String id) {

        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new CustomException("Customer not found"));

        customer.setDelete(false);
        customerRepository.save(customer);

        return "Customer recovered successfully";
    }

    // ================= RECOVER RETAILER =================
    public String recoverRetailer(String id) {

        Retailer retailer = retailerRepository.findById(id)
                .orElseThrow(() -> new CustomException("Retailer not found"));

        retailer.setDelete(false);
        retailerRepository.save(retailer);

        return "Retailer recovered successfully";
    }
}
