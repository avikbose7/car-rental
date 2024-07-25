package com.rental.dto;

public class LoginResponse {
    private String token;
    private String firstName;

    public LoginResponse(String token, String firstName) {
        this.token = token;
        this.firstName = firstName;
    }

    // Getters and setters
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
}

