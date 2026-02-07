package com.ayurkisan.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ayurkisan.dto.SignupRequest;
import com.ayurkisan.model.User;
import com.ayurkisan.repository.UserRepository;
import com.ayurkisan.util.JwtUtil;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    // USER REGISTRATION
    public User register(SignupRequest request) {

        // check already registered
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setAddress(request.getAddress());

        // BACKEND CONTROLLED FIELDS
        user.setRole("USER");
        user.setDelete(false);

        return userRepository.save(user);
    }

    // LOGIN (USER + ADMIN)
public String login(String email, String password) {

    User user = userRepository.findByEmailAndIsDeleteFalse(email)
            .orElseThrow(() -> new RuntimeException("404 User Not Found"));

    if (!user.getPassword().equals(password)) {
        throw new RuntimeException("404 User Not Found");
    }

    return jwtUtil.generateToken(user.getEmail(), user.getRole());
}

}
