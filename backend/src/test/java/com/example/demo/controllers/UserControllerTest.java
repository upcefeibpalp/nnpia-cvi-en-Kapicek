package com.example.demo.controllers;

import com.example.demo.domain.User;
import com.example.demo.services.UserService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(UserController.class)
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @Test
    void shouldReturnUserById_whenUserExists() throws Exception {
        User user = new User(1L, "pass", "test@example.com");
        Mockito.when(userService.findUserById(1L)).thenReturn(Optional.of(user));

        mockMvc.perform(get("/api/v1/users/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value("test@example.com"))
                .andExpect(jsonPath("$.id").value(1));
    }

    @Test
    void shouldReturnNotFound_whenUserDoesNotExist() throws Exception {
        Mockito.when(userService.findUserById(99L)).thenReturn(Optional.empty());

        mockMvc.perform(get("/api/v1/users/99"))
                .andExpect(status().isNotFound());
    }
}
