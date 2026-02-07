package com.ayurkisan.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.ayurkisan.dto.PasswordUpdateRequest;
import com.ayurkisan.dto.UserUpdateRequest;
import com.ayurkisan.model.User;
import com.ayurkisan.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // ================= USER APIs =================

    // GET SELF
    public User getSelf(String email) {
        return userRepository.findByEmailAndIsDeleteFalse(email)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "User not found"));
    }

    // UPDATE PROFILE
    public User updateProfile(String email, UserUpdateRequest req) {
        User user = getSelf(email);

        user.setName(req.getName());
        user.setAddress(req.getAddress());
        user.setPhone(req.getPhone());

        return userRepository.save(user);
    }

    // UPDATE PASSWORD
    public String updatePassword(String email, PasswordUpdateRequest req) {
        User user = getSelf(email);

        if (!user.getPassword().equals(req.getOldPassword())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Old password incorrect");
        }

        user.setPassword(req.getNewPassword());
        userRepository.save(user);

        return "Password updated successfully";
    }

    // SOFT DELETE
    public String deleteSelf(String email) {
        User user = getSelf(email);
        user.setDelete(true);
        userRepository.save(user);

        return "Account deleted successfully";
    }

    // ================= ADMIN APIs =================

    // GET ALL USERS (ONLY ROLE = USER, OPTIONAL ADDRESS)
    public List<User> getAllUsers(String address) {

        if (address != null && !address.trim().isEmpty()) {
            return userRepository
                    .findAllByRoleAndAddressContainingIgnoreCaseAndIsDeleteFalse(
                            "USER", address);
        }

        return userRepository.findAllByRoleAndIsDeleteFalse("USER");
    }

    // RECOVER SOFT-DELETED USER (EMAIL)
    public String recoverUserByEmail(String email) {

        User user = userRepository.findByEmailAndIsDeleteTrue(email)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "User not found or account is not deleted"));

        user.setDelete(false);
        userRepository.save(user);

        return "Account recovered successfully";
    }
}
