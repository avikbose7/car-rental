package com.rental.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rental.beans.User;
import com.rental.dto.LoginRequest;
import com.rental.dto.LoginResponse;
import com.rental.dto.UserDTO;
import com.rental.services.JwtUtil;
import com.rental.services.UserService;


@RestController
@RequestMapping(value="/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private JwtUtil jwtUtil;
    
        @Autowired
        private UserService userService;
        @Autowired
        private PasswordEncoder passwordEncoder;

        @PostMapping("/login")
        public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
            User existingUser = userService.getUserByEmail(loginRequest.getEmail());
            if (existingUser != null && passwordEncoder.matches(loginRequest.getPassword(), existingUser.getPassword())) {
                String token = jwtUtil.generateToken(existingUser.getEmail());
                String firstName = existingUser.getFirstname();
                return ResponseEntity.ok(new LoginResponse(token,firstName));
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message","Invalid username or password"));
            }
        }
        @PostMapping(value="/register")
        public ResponseEntity<String> registerUser(@RequestBody UserDTO userDTO) {
            if (userService.userExists(userDTO.getEmail())) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("User already exists");
            }
            userService.registerUser(userDTO);
            return ResponseEntity.ok("User registered successfully");
        }
        
}
