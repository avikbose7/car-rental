package com.rental.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rental.beans.User;
import com.rental.dao.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@RestController
@RequestMapping(value="/api")
@CrossOrigin(origins = "http://localhost:3000")
public class OTPController {

    @Autowired
    private JavaMailSender javaMailSender;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    private Map<String, String> otpMap = new HashMap<>();

    @PostMapping("/send-otp")
    public ResponseEntity<Map<String, String>> sendOTP(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        User existingUser = userRepository.findByEmail(email);

        if (existingUser == null) {
            return ResponseEntity.status(400).body(Map.of("message", "Email not registered"));
        }

        String otp = generateOTP();
        try {
            sendEmail(email, otp);
            otpMap.put(email, otp);
            return ResponseEntity.ok(Map.of("message", "OTP sent successfully"));
        } catch (MessagingException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("message", "Failed to send OTP"));
        }
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<Map<String, String>> verifyOTP(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String otp = request.get("otp");
        if (otpMap.containsKey(email) && otpMap.get(email).equals(otp)) {
            // Correct OTP
            return ResponseEntity.ok(Map.of("message", "OTP verification successful"));
        } else {
            // Incorrect OTP or OTP expired
            return ResponseEntity.status(400).body(Map.of("message", "Incorrect OTP"));
        }
    }
    @PostMapping("/reset-password")
    public ResponseEntity<Map<String, String>> resetPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String password = request.get("password");
        if (otpMap.containsKey(email)) {
            User user = userRepository.findByEmail(email);
            user.setEmail(email);
            user.setPassword(passwordEncoder.encode(password)); // Note: Ensure to hash the password in a real application
            userRepository.save(user);
            otpMap.remove(email);
            return ResponseEntity.ok(Map.of("message", "Password reset successfully"));
        } else {
            return ResponseEntity.status(400).body(Map.of("message", "Invalid email or OTP not verified"));
        }
    }

    private String generateOTP() {
        Random random = new Random();
        int otp = 100000 + random.nextInt(900000);
        return String.valueOf(otp);
    }

    private void sendEmail(String email, String otp) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setTo(email);
        helper.setSubject("OTP Verification");
        helper.setText("Your OTP is: " + otp);
        javaMailSender.send(message);
    }
}

