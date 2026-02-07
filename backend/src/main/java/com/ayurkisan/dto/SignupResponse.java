package com.ayurkisan.dto;

public class SignupResponse {

    private final String message;

    public SignupResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}
