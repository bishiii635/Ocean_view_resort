package com.oceanview.backend.service;

import com.oceanview.backend.model.*;
import com.oceanview.backend.repository.ReservationRepository;
import com.oceanview.backend.repository.UserRepository;
import com.oceanview.backend.repository.RoomRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private InvoiceService invoiceService;

    @Autowired
    private JavaMailSender mailSender;

    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    public List<Reservation> getReservationsByRoomId(String roomId) {
        return reservationRepository.findByRoomId(roomId);
    }

    public boolean isRoomAvailable(String roomId, java.time.LocalDate checkIn, java.time.LocalDate checkOut) {
        List<Reservation> activeReservations = reservationRepository.findByRoomId(roomId).stream()
                .filter(r -> r.getStatus() != ReservationStatus.REJECTED)
                .toList();

        for (Reservation res : activeReservations) {
            // Check for overlap
            if (!(checkOut.isBefore(res.getCheckIn()) || checkIn.isAfter(res.getCheckOut()))) {
                return false;
            }
        }
        return true;
    }

    public Reservation createReservation(Reservation reservation) {
        if (!isRoomAvailable(reservation.getRoomId(), reservation.getCheckIn(), reservation.getCheckOut())) {
            throw new RuntimeException("Room is not available for requested dates");
        }
        
        reservation.setStatus(ReservationStatus.PENDING);
        reservation.setPaymentStatus(PaymentStatus.UNPAID);
        return reservationRepository.save(reservation);
    }

    public Reservation getReservationById(String id) {
        return reservationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reservation not found"));
    }

    public Reservation updateReservationStatus(String id, ReservationStatus status) {
        Reservation reservation = getReservationById(id);
        reservation.setStatus(status);
        
        Reservation saved = reservationRepository.save(reservation);

        if (status == ReservationStatus.APPROVED) {
            invoiceService.createInvoice(saved);
            sendEmailNotification(saved, "Reservation Accepted", "Your reservation at Ocean View Resort has been accepted.");
        } else if (status == ReservationStatus.REJECTED) {
            sendEmailNotification(saved, "Reservation Rejected", "We are sorry to inform you that your reservation at Ocean View Resort has been rejected.");
        }

        return saved;
    }

    public Reservation updatePaymentStatus(String id, PaymentStatus status) {
        Reservation reservation = getReservationById(id);
        reservation.setPaymentStatus(status);
        Reservation saved = reservationRepository.save(reservation);
        
        // When paid, ensuring invoice exists
        invoiceService.createInvoice(saved);
        
        return saved;
    }

    private void sendEmailNotification(Reservation reservation, String subject, String messageContent) {
        User guest = userRepository.findById(reservation.getGuestId()).orElse(null);
        if (guest == null || guest.getEmail() == null) return;

        Room room = roomRepository.findById(reservation.getRoomId()).orElse(null);
        String roomName = room != null ? room.getName() : "Requested Room";

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(guest.getEmail());
            helper.setSubject(subject);

            String htmlContent = String.format(
                "<div style='font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;'>" +
                "<h2 style='color: #0ea5e9;'>Ocean View Resort</h2>" +
                "<p>Dear %s,</p>" +
                "<p>%s</p>" +
                "<hr/>" +
                "<h3>Reservation Details:</h3>" +
                "<p><strong>Room:</strong> %s</p>" +
                "<p><strong>Check-In:</strong> %s</p>" +
                "<p><strong>Check-Out:</strong> %s</p>" +
                "<p><strong>Total Price:</strong> Rs. %.2f</p>" +
                "<hr/>" +
                "<p>Thank you for choosing Ocean View Resort!</p>" +
                "</div>",
                guest.getName(), messageContent, roomName, reservation.getCheckIn(), reservation.getCheckOut(), reservation.getTotalCost()
            );

            helper.setText(htmlContent, true);
            mailSender.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

    public void deleteReservation(String id) {
        reservationRepository.deleteById(id);
    }
}
