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
            helper.setFrom("no-reply@oceanview.com");
            helper.setReplyTo(request.getEmail());
            helper.setSubject("New Contact Inquiry: " + request.getSubject());
            
            String htmlContent = String.format(
                "<div style=\"background-color: #FAF9F6; padding: 60px 20px; font-family: 'Times New Roman', serif; color: #2C1D1A;\">" +
                "  <div style=\"max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #E8E2D6; box-shadow: 0 20px 50px rgba(44,29,26,0.05);\">" +
                "    <div style=\"background-color: #2C1D1A; padding: 40px; text-align: center; border-bottom: 4px solid #C5A059;\">" +
                "      <h1 style=\"color: #C5A059; margin: 0; font-size: 18px; letter-spacing: 4px; text-transform: uppercase; font-weight: 900;\">Imperial Inquiry</h1>" +
                "      <p style=\"color: #C5A059; margin: 8px 0 0 0; font-size: 9px; letter-spacing: 3px; text-transform: uppercase; opacity: 0.8;\">Ocean View Resort Concierge</p>" +
                "    </div>" +
                "    <div style=\"padding: 50px;\">" +
                "      <div style=\"border-bottom: 1px solid #E8E2D6; padding-bottom: 25px; margin-bottom: 25px;\">" +
                "        <table style=\"width: 100%%; font-size: 14px; text-align: left;\">" +
                "          <tr><th style=\"color: #C5A059; text-transform: uppercase; font-size: 10px; width: 100px; padding-bottom: 10px;\">Noble Name</th><td style=\"font-style: italic; color: #2C1D1A;\">%s</td></tr>" +
                "          <tr><th style=\"color: #C5A059; text-transform: uppercase; font-size: 10px; padding-bottom: 10px;\">Email Portal</th><td style=\"font-style: italic; color: #2C1D1A;\">%s</td></tr>" +
                "          <tr><th style=\"color: #C5A059; text-transform: uppercase; font-size: 10px; padding-bottom: 10px;\">Subject</th><td style=\"font-weight: bold; color: #2C1D1A;\">%s</td></tr>" +
                "        </table>" +
                "      </div>" +
                "      " +
                "      <div style=\"background-color: #FAF9F6; padding: 30px; border: 1px dashed #E8E2D6; border-left: 3px solid #C5A059;\">" +
                "        <h4 style=\"margin: 0 0 15px 0; color: #2C1D1A; text-transform: uppercase; letter-spacing: 2px; font-size: 10px;\">The Missive Content</h4>" +
                "        <p style=\"font-size: 16px; font-style: italic; color: #5D4037; line-height: 1.8; margin: 0;\">%s</p>" +
                "      </div>" +
                "      " +
                "      <div style=\"margin-top: 40px; text-align: center;\">" +
                "        <a href=\"mailto:%s\" style=\"background-color: #2C1D1A; color: #C5A059; padding: 15px 35px; border: 1px solid #C5A059; text-decoration: none; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; display: inline-block;\">Respond to Guest</a>" +
                "      </div>" +
                "    </div>" +
                "    <div style=\"background-color: #FAF9F6; padding: 25px; text-align: center; border-top: 1px solid #E8E2D6;\">" +
                "      <p style=\"margin: 0; font-size: 8px; color: #8D6E63; letter-spacing: 2px; text-transform: uppercase;\">Automated Courier &mdash; Imperial Registry</p>" +
                "    </div>" +
                "  </div>" +
                "</div>",
                request.getName(), request.getEmail(), request.getSubject(), request.getMessage(), request.getEmail()
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
