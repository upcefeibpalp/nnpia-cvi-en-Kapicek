package com.example.demo.services;

import org.springframework.stereotype.Service;

@Service
public class GreetingService {
    public String sayGreeting() {
        return "Hello, World!";
    }
}
