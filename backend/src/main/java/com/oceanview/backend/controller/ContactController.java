package com.oceanview.backend.controller;

import com.oceanview.backend.dto.ContactRequest;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "http://localhost:5173")
public class ContactController {

    @Autowired
    private JavaMailSender mailSender;

    @PostMapping
    public ResponseEntity<?> sendContactEmail(@RequestBody ContactRequest request) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            
            // Send to Admin
            helper.setTo("admin@oceanview.com");
            helper.setSubject("New Contact Inquiry: " + request.getSubject());
            
            String htmlContent = String.format(
                "<div style='font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;'>" +
                "<h2 style='color: #0ea5e9;'>New Inquiry from Ocean View Website</h2>" +
                "<p><strong>Name:</strong> %s</p>" +
                "<p><strong>Email:</strong> %s</p>" +
                "<p><strong>Subject:</strong> %s</p>" +
                "<hr/>" +
                "<p><strong>Message:</strong></p>" +
                "<p style='background: #f8fafc; padding: 15px; border-radius: 8px;'>%s</p>" +
                "</div>",
                request.getName(), request.getEmail(), request.getSubject(), request.getMessage()
            );
            
            helper.setText(htmlContent, true);
            mailSender.send(message);
            
            return ResponseEntity.ok().build();
        } catch (MessagingException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error sending email: " + e.getMessage());
        }
    }
}
