package com.ayurkisan.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ayurkisan.model.Customer;
import com.ayurkisan.model.Retailer;
import com.ayurkisan.service.AdminService;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin("*")
public class AdminController {

    @Autowired
    private AdminService adminService;

    // ================= VIEW ALL CUSTOMERS =================
    @GetMapping("/customers")
    public List<Customer> getAllCustomers() {
        return adminService.getAllCustomers();
    }

    // ================= VIEW ALL RETAILERS =================
    @GetMapping("/retailers")
    public List<Retailer> getAllRetailers() {
        return adminService.getAllRetailers();
    }

  // ================= RECOVER CUSTOMER =================
@PutMapping("/recover/customer/{id}")
public String recoverCustomer(@PathVariable String id) {
    return adminService.recoverCustomer(id);
}

// ================= RECOVER RETAILER =================
@PutMapping("/recover/retailer/{id}")
public String recoverRetailer(@PathVariable String id) {
    return adminService.recoverRetailer(id);
}

}
