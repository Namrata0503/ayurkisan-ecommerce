package com.ayurkisan.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.ayurkisan.model.User;

public interface UserRepository extends MongoRepository<User, String> {

    // USER SELF
    Optional<User> findByEmailAndIsDeleteFalse(String email);

    // ADMIN - RECOVER USER (EMAIL + isDelete = true)
    Optional<User> findByEmailAndIsDeleteTrue(String email);

    // ADMIN - GET ALL USERS (ONLY ROLE = USER)
    List<User> findAllByRoleAndIsDeleteFalse(String role);

    // ADMIN - GET USERS BY ADDRESS (ONLY ROLE = USER)
    List<User> findAllByRoleAndAddressContainingIgnoreCaseAndIsDeleteFalse(
            String role, String address);

    boolean existsByEmail(String email);
}
