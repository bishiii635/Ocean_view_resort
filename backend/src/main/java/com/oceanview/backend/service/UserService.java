package com.oceanview.backend.service;

import com.oceanview.backend.dto.LoginRequest;
import com.oceanview.backend.dto.RegisterRequest;
import com.oceanview.backend.dto.ResetPasswordRequest;
import com.oceanview.backend.model.Role;
import com.oceanview.backend.model.User;
import com.oceanview.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JavaMailSender mailSender;

    public User registerUser(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already taken");
        }
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword()); // In a real app, hash this password!
        user.setRole(Role.GUEST); // Default role
        return userRepository.save(user);
    }

    public User loginUser(LoginRequest request) {
        Optional<User> user = userRepository.findByEmail(request.getEmail());
        if (user.isPresent() && user.get().getPassword().equals(request.getPassword())) {
             // In a real app, verify hashed password
            return user.get();
        }
        throw new RuntimeException("Invalid credentials");
    }

    public void processForgotPassword(String email) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            String token = UUID.randomUUID().toString();
            user.setResetPasswordToken(token);
            user.setResetPasswordTokenExpiry(System.currentTimeMillis() + 3600000); // 1 hour expiry
            userRepository.save(user);

            sendResetEmail(user.getEmail(), token);
        } else {
            throw new RuntimeException("User not found with email: " + email);
        }
    }

    private void sendResetEmail(String email, String token) {
        String resetUrl = "http://localhost:5173/reset-password?token=" + token;
        
        try {
            jakarta.mail.internet.MimeMessage mimeMessage = mailSender.createMimeMessage();
            org.springframework.mail.javamail.MimeMessageHelper helper = new org.springframework.mail.javamail.MimeMessageHelper(mimeMessage, "utf-8");
            
            String htmlMsg = "<div style=\"background-color: #FAF9F6; padding: 60px 20px; font-family: 'Times New Roman', serif; color: #2C1D1A;\">" +
                "  <div style=\"max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #E8E2D6; box-shadow: 0 20px 50px rgba(44,29,26,0.05);\">" +
                "    <div style=\"background-color: #2C1D1A; padding: 50px 40px; text-align: center; border-bottom: 5px solid #C5A059;\">" +
                "      <div style=\"display: inline-block; padding: 12px; border: 1px solid #C5A059; margin-bottom: 20px;\">" +
                "        <span style=\"color: #C5A059; font-size: 24px; font-weight: bold;\">OVR</span>" +
                "      </div>" +
                "      <h1 style=\"color: #C5A059; margin: 0; font-size: 22px; letter-spacing: 5px; text-transform: uppercase; font-weight: 900;\">Security Ledger</h1>" +
                "      <p style=\"color: #C5A059; margin: 10px 0 0 0; font-size: 9px; letter-spacing: 3px; text-transform: uppercase; opacity: 0.8;\">Ocean View Palace Registry</p>" +
                "    </div>" +
                "    <div style=\"padding: 50px; line-height: 1.8;\">" +
                "      <h2 style=\"font-style: italic; color: #2C1D1A; margin-top: 0; font-size: 24px; font-weight: 300;\">Password Recovery Decree</h2>" +
                "      <p style=\"font-size: 16px; color: #5D4037; font-weight: 500; margin-bottom: 35px;\">" +
                "        A request has been received by the Imperial Records Office to rescind your previous cipher and establish a new one. If this mission was not authorized by you, the present scroll may be safely ignored." +
                "      </p>" +
                "      <div style=\"text-align: center; margin: 45px 0;\">" +
                "        <a href=\"" + resetUrl + "\" style=\"background-color: #2C1D1A; color: #C5A059; padding: 18px 45px; border: 1px solid #C5A059; text-decoration: none; font-weight: bold; font-size: 11px; text-transform: uppercase; letter-spacing: 3px; display: inline-block; box-shadow: 0 10px 20px rgba(0,0,0,0.1);\">Establish New Cipher</a>" +
                "      </div>" +
                "      <p style=\"font-size: 13px; color: #8D6E63; text-align: center; font-style: italic;\">This authorization link expires in 60 minutes for your security.</p>" +
                "      <hr style=\"border: 0; border-top: 1px solid #E8E2D6; margin: 40px 0;\">" +
                "      <p style=\"font-size: 12px; color: #94a3b8; font-style: italic; line-height: 1.6;\">" +
                "        If the button fails to operate, please relay the following scroll to your browser portal:<br/>" +
                "        <span style=\"color: #C5A059; word-break: break-all;\">" + resetUrl + "</span>" +
                "      </p>" +
                "    </div>" +
                "    <div style=\"background-color: #FAF9F6; padding: 25px; text-align: center; border-top: 1px solid #E8E2D6;\">" +
                "      <p style=\"margin: 0; font-size: 9px; color: #8D6E63; letter-spacing: 2px; text-transform: uppercase; font-weight: bold;\">&copy; 2026 Ocean View Resort. Portals of Heritage.</p>" +
                "    </div>" +
                "  </div>" +
                "</div>";

            helper.setText(htmlMsg, true);
            helper.setTo(email);
            helper.setSubject("Ocean View Resort - Password Reset");
            helper.setFrom("no-reply@oceanview.com");
            
            mailSender.send(mimeMessage);
        } catch (jakarta.mail.MessagingException e) {
            throw new RuntimeException("Failed to send reset email: " + e.getMessage());
        }
    }

    public void resetPassword(ResetPasswordRequest request) {
        Optional<User> userOptional = userRepository.findByResetPasswordToken(request.getToken());
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (user.getResetPasswordTokenExpiry() > System.currentTimeMillis()) {
                user.setPassword(request.getNewPassword()); // In a real app, hash this!
                user.setResetPasswordToken(null);
                user.setResetPasswordTokenExpiry(null);
                userRepository.save(user);
            } else {
                throw new RuntimeException("Token expired");
            }
        } else {
            throw new RuntimeException("Invalid token");
        }
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(String id) {
        return userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User updateUser(String id, User userDetails) {
        User user = getUserById(id);
        user.setName(userDetails.getName());
        user.setEmail(userDetails.getEmail());
        if (userDetails.getPassword() != null && !userDetails.getPassword().isEmpty()) {
            user.setPassword(userDetails.getPassword());
        }
        user.setRole(userDetails.getRole());
        return userRepository.save(user);
    }

    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }

    public User saveUser(User user) {
        if (user.getId() == null && userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already taken");
        }
        return userRepository.save(user);
    }
}
