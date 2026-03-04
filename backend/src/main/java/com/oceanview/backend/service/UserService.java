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
            
            String htmlMsg = "<div style=\"font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc; padding: 40px 20px; color: #1e293b;\">" +
                "  <div style=\"max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.05); border: 1px solid #e2e8f0;\">" +
                "    <div style=\"background: linear-gradient(135deg, #0ea5e9, #2563eb); padding: 40px 20px; text-align: center;\">" +
                "      <h1 style=\"color: #ffffff; margin: 0; font-size: 28px; letter-spacing: -0.5px;\">Ocean View Resort</h1>" +
                "      <p style=\"color: #e0f2fe; margin-top: 10px; font-size: 16px;\">Password Reset Request</p>" +
                "    </div>" +
                "    <div style=\"padding: 40px; line-height: 1.6;\">" +
                "      <h2 style=\"color: #0f172a; margin-top: 0; font-size: 24px;\">Hello,</h2>" +
                "      <p style=\"font-size: 16px; color: #475569;\">We received a request to reset your password. If you didn't make this request, you can safely ignore this email.</p>" +
                "      <div style=\"text-align: center; margin: 40px 0;\">" +
                "        <a href=\"" + resetUrl + "\" style=\"background-color: #0f172a; color: #ffffff; padding: 16px 36px; border-radius: 12px; text-decoration: none; font-weight: 600; font-size: 16px; display: inline-block; transition: all 0.3s ease; box-shadow: 0 4px 6px rgba(0,0,0,0.1);\">Reset Password</a>" +
                "      </div>" +
                "      <p style=\"font-size: 14px; color: #64748b; text-align: center;\">This link will expire in 1 hour for your security.</p>" +
                "      <hr style=\"border: 0; border-top: 1px solid #e2e8f0; margin: 30px 0;\">" +
                "      <p style=\"font-size: 13px; color: #94a3b8;\">If you're having trouble clicking the \"Reset Password\" button, copy and paste the URL below into your web browser:</p>" +
                "      <p style=\"font-size: 13px; color: #3b82f6; word-break: break-all;\">" + resetUrl + "</p>" +
                "    </div>" +
                "    <div style=\"background-color: #f1f5f9; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;\">" +
                "      <p style=\"margin: 0; font-size: 14px; color: #64748b;\">&copy; 2026 Ocean View Resort. All rights reserved.</p>" +
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
