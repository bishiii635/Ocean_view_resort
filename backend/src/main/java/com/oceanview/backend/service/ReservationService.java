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
            helper.setSubject("Ocean View Resort - " + subject);

            String htmlContent = String.format(
                "<div style=\"background-color: #FAF9F6; padding: 60px 20px; font-family: 'Times New Roman', serif; color: #2C1D1A;\">" +
                "  <div style=\"max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #E8E2D6; box-shadow: 0 20px 50px rgba(44,29,26,0.05);\">" +
                "    <div style=\"background-color: #2C1D1A; padding: 50px 40px; text-align: center; border-bottom: 5px solid #C5A059;\">" +
                "      <div style=\"display: inline-block; padding: 15px; border: 1px solid #C5A059; margin-bottom: 20px;\">" +
                "        <span style=\"color: #C5A059; font-size: 30px; font-weight: bold;\">W</span>" +
                "      </div>" +
                "      <h1 style=\"color: #C5A059; margin: 0; font-size: 24px; letter-spacing: 5px; text-transform: uppercase; font-weight: 900;\">Ocean View</h1>" +
                "      <p style=\"color: #C5A059; margin: 10px 0 0 0; font-size: 10px; letter-spacing: 4px; text-transform: uppercase; opacity: 0.8;\">Resort & Imperial Estate</p>" +
                "    </div>" +
                "    <div style=\"padding: 50px 50px 40px 50px; line-height: 1.8;\">" +
                "      <h2 style=\"font-style: italic; color: #2C1D1A; margin-top: 0; font-size: 26px; font-weight: 300; border-bottom: 1px solid #E8E2D6; pb: 20px; mb: 30px;\">Greetings, %s</h2>" +
                "      <p style=\"font-size: 16px; color: #5D4037; font-weight: 500; margin-bottom: 40px;\">%s</p>" +
                "      " +
                "      <div style=\"background-color: #FAF9F6; padding: 40px; border-left: 3px solid #C5A059; margin-bottom: 40px;\">" +
                "        <h4 style=\"margin: 0 0 20px 0; color: #2C1D1A; text-transform: uppercase; letter-spacing: 2px; font-size: 12px;\">Sanctuarial Record</h4>" +
                "        <div style=\"display: grid; gap: 15px;\">" +
                "          <p style=\"margin: 5px 0;\"><strong style=\"color: #C5A059; text-transform: uppercase; font-size: 10px; letter-spacing: 1px;\">Sanctuary:</strong> <span style=\"font-style: italic; font-size: 18px;\">%s</span></p>" +
                "          <p style=\"margin: 5px 0;\"><strong style=\"color: #C5A059; text-transform: uppercase; font-size: 10px; letter-spacing: 1px;\">Era Span:</strong> <span style=\"font-style: italic;\">%s &mdash; %s</span></p>" +
                "          <p style=\"margin: 5px 0;\"><strong style=\"color: #C5A059; text-transform: uppercase; font-size: 10px; letter-spacing: 1px;\">Valuation:</strong> <span style=\"font-weight: bold; font-size: 20px;\">LKR %.2f</span></p>" +
                "        </div>" +
                "      </div>" +
                "      " +
                "      <p style=\"font-size: 14px; text-align: center; font-style: italic; color: #8D6E63; margin-top: 50px;\">" +
                "        \"Your comfort is our heritage. We await your arrival at the estate.\"" +
                "      </p>" +
                "    </div>" +
                "    <div style=\"background-color: #FAF9F6; padding: 30px; text-align: center; border-top: 1px solid #E8E2D6;\">" +
                "      <p style=\"margin: 0; font-size: 9px; color: #8D6E63; letter-spacing: 2px; text-transform: uppercase; font-weight: bold;\">&copy; 2026 Ocean View Resort. All Noble Rights Reserved.</p>" +
                "    </div>" +
                "  </div>" +
                "</div>",
                guest.getName(), messageContent, roomName, reservation.getCheckIn(), reservation.getCheckOut(), reservation.getTotalCost()
            );

            helper.setText(htmlContent, true);
            mailSender.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

    public void sendInvoiceEmail(String reservationId) {
        Reservation reservation = getReservationById(reservationId);
        User guest = userRepository.findById(reservation.getGuestId()).orElse(null);
        if (guest == null || guest.getEmail() == null) return;

        Room room = roomRepository.findById(reservation.getRoomId()).orElse(null);
        String roomName = room != null ? room.getName() : "Grand Sanctuary";

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(guest.getEmail());
            helper.setSubject("Ocean View Resort - Imperial Statement #" + reservationId.substring(0, 8).toUpperCase());

            String htmlContent = String.format(
                "<div style=\"background-color: #FAF9F6; padding: 60px 20px; font-family: 'Times New Roman', serif; color: #2C1D1A;\">" +
                "  <div style=\"max-width: 600px; margin: 0 auto; background-color: #ffffff; border-top: 10px solid #C5A059; box-shadow: 0 20px 50px rgba(0,0,0,0.1);\">" +
                "    <div style=\"padding: 50px; border: 1px solid #E8E2D6;\">" +
                "      <div style=\"text-align: right; margin-bottom: 40px;\">" +
                "        <h1 style=\"color: #2C1D1A; margin: 0; font-size: 28px; text-transform: uppercase; letter-spacing: 2px; font-weight: 900; font-style: italic;\">Imperial Statement</h1>" +
                "        <p style=\"color: #C5A059; margin: 5px 0 0 0; font-size: 10px; letter-spacing: 3px; text-transform: uppercase; font-weight: bold;\">Official Ledger Entry</p>" +
                "      </div>" +
                "      " +
                "      <div style=\"margin-bottom: 50px;\">" +
                "        <p style=\"margin: 0; font-size: 10px; color: #C5A059; text-transform: uppercase; letter-spacing: 2px; font-weight: bold;\">Noble Patron</p>" +
                "        <p style=\"margin: 5px 0; font-size: 20px; font-weight: bold; font-style: italic;\">%s</p>" +
                "      </div>" +
                "      " +
                "      <div style=\"border: 1px solid #E8E2D6; margin-bottom: 40px; background-color: #FAF9F6;\">" +
                "        <div style=\"background-color: #2C1D1A; color: #C5A059; padding: 15px 25px; display: flex; justify-content: space-between;\">" +
                "          <span style=\"font-size: 10px; text-transform: uppercase; letter-spacing: 2px;\">Service Details</span>" +
                "          <span style=\"font-size: 10px; text-transform: uppercase; letter-spacing: 2px; float: right;\">Valuation</span>" +
                "        </div>" +
                "        <div style=\"padding: 30px;\">" +
                "          <div style=\"display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;\">" +
                "            <div style=\"width: 70%%;\">" +
                "              <p style=\"margin: 0; font-size: 18px; font-weight: bold; font-style: italic;\">%s</p>" +
                "              <p style=\"margin: 5px 0 0 0; font-size: 9px; color: #8D6E63; text-transform: uppercase; letter-spacing: 1px;\">Imperial Residency Decree #%s</p>" +
                "            </div>" +
                "            <div style=\"width: 30%%; text-align: right; float: right;\">" +
                "              <p style=\"margin: 0; font-size: 18px; font-weight: bold;\">LKR %.2f</p>" +
                "            </div>" +
                "            <div style=\"clear: both;\"></div>" +
                "          </div>" +
                "          <hr style=\"border: 0; border-top: 1px solid #E8E2D6; margin: 20px 0;\" />" +
                "          <div style=\"text-align: right;\">" +
                "            <p style=\"margin: 0; font-size: 10px; color: #C5A059; text-transform: uppercase; letter-spacing: 1px; font-weight: bold;\">Total Prosperity Summation</p>" +
                "            <p style=\"margin: 5px 0 0 0; font-size: 32px; font-weight: 900; color: #2C1D1A; font-style: italic;\">LKR %.2f</p>" +
                "          </div>" +
                "        </div>" +
                "      </div>" +
                "      " +
                "      <div style=\"text-align: center; margin-top: 50px;\">" +
                "        <p style=\"font-size: 11px; color: #8D6E63; font-weight: 500; font-style: italic;\">\"Transcribed by the Imperial Records Office - 2026\"</p>" +
                "      </div>" +
                "    </div>" +
                "  </div>" +
                "</div>",
                guest.getName(), roomName, reservationId.substring(0, 8).toUpperCase(), reservation.getTotalCost(), reservation.getTotalCost()
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
