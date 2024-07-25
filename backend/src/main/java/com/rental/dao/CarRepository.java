package com.rental.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import com.rental.beans.Car;

public interface CarRepository extends JpaRepository<Car, Integer> {
	
}
