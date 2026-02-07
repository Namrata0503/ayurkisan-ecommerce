package com.ayurkisan.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ayurkisan.dto.PasswordUpdateRequest;
import com.ayurkisan.dto.UserUpdateRequest;
import com.ayurkisan.model.User;
import com.ayurkisan.service.UserService;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    // SELF INFO
    @GetMapping("/me")
    public User getSelf(@RequestParam String email) {
        return userService.getSelf(email);
    }

    // UPDATE PROFILE INFO
    @PutMapping("/update-profile")
    public User updateProfile(
            @RequestParam String email,
            @RequestBody UserUpdateRequest request) {

        return userService.updateProfile(email, request);
    }

    // UPDATE PASSWORD
    @PutMapping("/update-password")
    public String updatePassword(
            @RequestParam String email,
            @RequestBody PasswordUpdateRequest request) {

        return userService.updatePassword(email, request);
    }

    // SOFT DELETE
    @DeleteMapping("/delete")
    public String deleteSelf(@RequestParam String email) {
        return userService.deleteSelf(email);
    }

    
}
