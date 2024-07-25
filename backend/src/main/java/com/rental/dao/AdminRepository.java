package com.rental.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rental.beans.Admin;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    Admin findByUsername(String username);
}