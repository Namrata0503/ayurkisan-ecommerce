package com.ayurkisan.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ayurkisan.model.User;
import com.ayurkisan.service.UserService;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final UserService userService;

    public AdminController(UserService userService) {
        this.userService = userService;
    }

    // GET ALL USERS (ONLY USER ROLE, ADDRESS OPTIONAL)
    @GetMapping("/users")
    public List<User> getAllUsers(
            @RequestParam(required = false) String address) {
        return userService.getAllUsers(address);
    }

    // RECOVER USER (EMAIL + isDelete = true)
    @PutMapping("/recover")
    public String recoverUser(@RequestParam String email) {
        return userService.recoverUserByEmail(email);
    }
}
