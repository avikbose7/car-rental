package com.rental.beans;

import jakarta.persistence.*;

import java.sql.Time;
import java.util.Date;

@Entity
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="first_name")
    private String firstName;
    
    @Column(name="last_name")
    private String lastName;
    
    @Column(name="email")
    private String email;
    
    @Column(name="phone")
    private String phoneNumber;
    
    @Column(name="from_address")
    private String fromAddress;
    
    @Column(name="to_address")
    private String toAddress;
    
    @Column(name="no_of_person")
    private String personCount;
    
    @Column(name="no_of_luggage")
    private String luggageCount;
    
    @Column(name="date")
    private Date journeyDate;
    
    @Column(name="time")
    private Time journeyTime;
    
    
    
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPhoneNumber() {
		return phoneNumber;
	}
	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
	public String getFromAddress() {
		return fromAddress;
	}
	public void setFromAddress(String fromAddress) {
		this.fromAddress = fromAddress;
	}
	public String getToAddress() {
		return toAddress;
	}
	public void setToAddress(String toAddress) {
		this.toAddress = toAddress;
	}
	public String getPersonCount() {
		return personCount;
	}
	public void setPersonCount(String personCount) {
		this.personCount = personCount;
	}
	public String getLuggageCount() {
		return luggageCount;
	}
	public void setLuggageCount(String luggageCount) {
		this.luggageCount = luggageCount;
	}
	public Date getJourneyDate() {
		return journeyDate;
	}
	public void setJourneyDate(Date journeyDate) {
		this.journeyDate = journeyDate;
	}
	public Time getJourneyTime() {
		return journeyTime;
	}
	public void setJourneyTime(Time journeyTime) {
		this.journeyTime = journeyTime;
	}


}
