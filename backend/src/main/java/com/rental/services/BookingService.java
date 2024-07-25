package com.rental.services;

import com.rental.beans.Booking;
import com.rental.dao.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public Booking getBookingById(Long id) {
        return bookingRepository.findById(id).orElse(null);
    }

    public Booking createBooking(Booking booking) {
        return bookingRepository.save(booking);
    }

    public Booking updateBooking(Long id, Booking bookingDetails) {
        Booking booking = bookingRepository.findById(id).orElse(null);
        if (booking != null) {
            booking.setFirstName(bookingDetails.getFirstName());
            booking.setLastName(bookingDetails.getLastName());
            booking.setEmail(bookingDetails.getEmail());
            booking.setPhoneNumber(bookingDetails.getPhoneNumber());
            booking.setFromAddress(bookingDetails.getFromAddress());
            booking.setToAddress(bookingDetails.getToAddress());
            booking.setPersonCount(bookingDetails.getPersonCount());
            booking.setLuggageCount(bookingDetails.getLuggageCount());
            booking.setJourneyDate(bookingDetails.getJourneyDate());
            booking.setJourneyTime(bookingDetails.getJourneyTime());
            return bookingRepository.save(booking);
        } else {
            return null;
        }
    }

    public void deleteBooking(Long id) {
        bookingRepository.deleteById(id);
    }
}
