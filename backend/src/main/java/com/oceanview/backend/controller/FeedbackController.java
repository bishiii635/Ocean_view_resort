package com.oceanview.backend.controller;

import com.oceanview.backend.model.Feedback;
import com.oceanview.backend.model.FeedbackStatus;
import com.oceanview.backend.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feedbacks")
@CrossOrigin(origins = "http://localhost:5173")
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    @PostMapping
    public ResponseEntity<Feedback> submitFeedback(@RequestBody Feedback feedback) {
        return ResponseEntity.ok(feedbackService.submitFeedback(feedback));
    }

    @GetMapping
    public List<Feedback> getAllFeedbacks() {
        return feedbackService.getAllFeedbacks();
    }

    @GetMapping("/approved")
    public List<Feedback> getApprovedFeedbacks() {
        return feedbackService.getApprovedFeedbacks();
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Feedback> updateStatus(@PathVariable String id, @RequestParam FeedbackStatus status) {
        return ResponseEntity.ok(feedbackService.updateStatus(id, status));
    }
}
