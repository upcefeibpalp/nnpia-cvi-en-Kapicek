package com.example.demo.services;

import com.example.demo.domain.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import jakarta.annotation.PostConstruct;
import java.util.HashMap;
import java.util.Map;

@Service
public class UserService {
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);
    private final Map<Long, User> users = new HashMap<>();

    @PostConstruct
    public void init() {
        users.put(1L, new User(1L, "password123", "user1@example.com"));
        users.put(2L, new User(2L, "password456", "user2@example.com"));
        logger.info("Uživatelé inicializováni: {}", users);
    }

    public User findUser(Long id) {
        return users.get(id);
    }

    public Map<Long, User> findAllUsers() {
        return users;
    }
}
