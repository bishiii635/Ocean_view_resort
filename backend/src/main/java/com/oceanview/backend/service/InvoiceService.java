package com.oceanview.backend.service;

import com.oceanview.backend.model.Invoice;
import com.oceanview.backend.model.Reservation;
import com.oceanview.backend.model.User;
import com.oceanview.backend.model.Room;
import com.oceanview.backend.repository.InvoiceRepository;
import com.oceanview.backend.repository.UserRepository;
import com.oceanview.backend.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class InvoiceService {

    @Autowired
    private InvoiceRepository invoiceRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoomRepository roomRepository;

    public List<Invoice> getAllInvoices() {
        return invoiceRepository.findAll();
    }

    public Invoice getInvoiceByReservationId(String reservationId) {
        return invoiceRepository.findByReservationId(reservationId).orElse(null);
    }

    public Invoice createInvoice(Reservation reservation) {
        User guest = userRepository.findById(reservation.getGuestId()).orElse(null);
        Room room = roomRepository.findById(reservation.getRoomId()).orElse(null);

        Invoice invoice = invoiceRepository.findByReservationId(reservation.getId()).orElse(new Invoice());
        
        invoice.setReservationId(reservation.getId());
        invoice.setGuestId(reservation.getGuestId());
        invoice.setGuestName(guest != null ? guest.getName() : "Unknown Guest");
        invoice.setRoomName(room != null ? room.getName() : "Unknown Room");
        invoice.setTotalPrice(reservation.getTotalCost());
        invoice.setInvoiceDate(LocalDateTime.now());
        invoice.setPaymentStatus(reservation.getPaymentStatus());

        return invoiceRepository.save(invoice);
    }
}
