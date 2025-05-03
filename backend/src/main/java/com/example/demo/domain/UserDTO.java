package com.example.demo.domain;

public class UserDTO {
    private Long id;
    private String email;
    private boolean active;

    public UserDTO(Long id, String email, boolean active) {
        this.id = id;
        this.email = email;
        this.active = active;
    }

    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }
}
