package com.rental.services;

import com.rental.beans.Payment;
import com.rental.dao.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    public Payment getPaymentById(Long id) {
        return paymentRepository.findById(id).orElse(null);
    }

    public Payment createPayment(Payment payment) {
        return paymentRepository.save(payment);
    }

    public Payment updatePayment(Long id, Payment paymentDetails) {
        Payment payment = paymentRepository.findById(id).orElse(null);
        if (payment != null) {
            payment.setCardName(paymentDetails.getCardName());
            payment.setCardNo(paymentDetails.getCardNo());
            payment.setCardName(paymentDetails.getCardExp());
            payment.setCvv(paymentDetails.getCvv());
            payment.setVprice(paymentDetails.getVprice());
            return paymentRepository.save(payment);
        } else {
            return null;
        }
    }

    public void deletePayment(Long id) {
        paymentRepository.deleteById(id);
    }
}
