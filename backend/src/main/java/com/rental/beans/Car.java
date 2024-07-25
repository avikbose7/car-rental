package com.rental.beans;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "cars")
public class Car {
    @Id
    private int id;
    
    @Column(name = "brand")
    private String brand;
    
    @Column(name = "rating")
    private int rating;
    
    @Column(name = "car_name")
    private String carName;
    
    @Column(name = "img_url")
    private String imgUrl;
    
    @Column(name = "model")
    private String model;
    
    @Column(name = "price")
    private double price;
    
    @Column(name = "speed")
    private String speed;
    
    @Column(name = "gps")
    private String gps;
    
    @Column(name = "seat_type")
    private String seatType;
    
    @Column(name = "automatic")
    private String automatic;
    
    @Column(name = "description")
    private String description;
    
    
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getBrand() {
		return brand;
	}
	public void setBrand(String brand) {
		this.brand = brand;
	}
	public int getRating() {
		return rating;
	}
	public void setRating(int rating) {
		this.rating = rating;
	}
	public String getCarName() {
		return carName;
	}
	public void setCarName(String carName) {
		this.carName = carName;
	}
	public String getImgUrl() {
		return imgUrl;
	}
	public void setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl;
	}
	public String getModel() {
		return model;
	}
	public void setModel(String model) {
		this.model = model;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public String getSpeed() {
		return speed;
	}
	public void setSpeed(String speed) {
		this.speed = speed;
	}
	public String getGps() {
		return gps;
	}
	public void setGps(String gps) {
		this.gps = gps;
	}
	public String getSeatType() {
		return seatType;
	}
	public void setSeatType(String seatType) {
		this.seatType = seatType;
	}
	public String getAutomatic() {
		return automatic;
	}
	public void setAutomatic(String automatic) {
		this.automatic = automatic;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
    
}
