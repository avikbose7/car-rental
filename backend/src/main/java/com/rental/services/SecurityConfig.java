package com.rental.services;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
     SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(authorize -> authorize
                .requestMatchers(
                		"/api/send-otp",
                		"/api/cars/allCars", 
                		"/api/verify-otp", 
                		"/api/users",
                		"/api/user/detail",
                		"/api/users/register",
                		"/api/user/getall", 
                		"/api/users/login",
                		"/api/user/details",
                		"/assets/all-imges/**",
                		"/api/admin/**",
                		"/api/email/send",
                		"/api/payments",
                		"/api/bookings",
                		"api/reset-password"
                		).permitAll()
                .anyRequest().authenticated()
            )
            .formLogin(form -> form
                .loginProcessingUrl("/login")
                .defaultSuccessUrl("/home", true)
                .permitAll()
            )
            .logout(logout -> logout
                .logoutUrl("/logout")
                .logoutSuccessUrl("/login")
                .permitAll()
            )
            .csrf(csrf -> csrf.disable());

        return http.build();
    }

    @Bean
     PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

//    @Bean
//     UserDetailsService userDetailsService() {
//        return new CustomUserDetailsService();
//    }
}
