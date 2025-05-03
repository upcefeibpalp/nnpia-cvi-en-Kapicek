package com.example.demo.controllers;

import com.example.demo.domain.User;
import com.example.demo.domain.UserDTO;
import com.example.demo.domain.UserUpdateDTO;
import com.example.demo.exceptions.UserNotFoundException;
import com.example.demo.services.UserService;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.example.demo.domain.UserCreateDTO;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.http.HttpStatus;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/v1/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<UserDTO> findAllUsers(@RequestParam(required = false) String email) {
        if (email != null) {
            return userService.findUserByEmail(email)
                    .map(user -> List.of(new UserDTO(user.getId(), user.getEmail(), user.isActive())))
                    .orElse(List.of());
        }
        return userService.findAllUsers()
                .stream()
                .map(user -> new UserDTO(user.getId(), user.getEmail(), user.isActive()))
                .toList();
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> findUserById(@PathVariable Long id) {
        return userService.findUserById(id)
                .map(user -> ResponseEntity.ok(new UserDTO(user.getId(), user.getEmail(), user.isActive())))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<UserDTO> createUser(@RequestBody UserCreateDTO dto) {
        User created = userService.createUser(dto.getEmail(), dto.getPassword());
        UserDTO userDTO = new UserDTO(created.getId(), created.getEmail(), created.isActive());
        URI location = URI.create("/api/v1/users/" + created.getId());
        return ResponseEntity.created(location).body(userDTO);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUserById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDTO> updateUser(
            @PathVariable Long id,
            @RequestBody UserUpdateDTO dto) {

        return userService.updateUser(id, dto.getEmail(), dto.getPassword())
                .map(updated -> ResponseEntity.ok(new UserDTO(updated.getId(), updated.getEmail(), updated.isActive())))
                .orElse(ResponseEntity.notFound().build());
    }

    @ExceptionHandler(UserNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public void handleUserNotFound() {
    }

    @PostMapping("/{id}/activate")
    public ResponseEntity<Void> activateUser(@PathVariable Long id) {
        userService.activateUser(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/deactivate")
    public ResponseEntity<Void> deactivateUser(@PathVariable Long id) {
        userService.deactivateUser(id);
        return ResponseEntity.ok().build();
    }

}
