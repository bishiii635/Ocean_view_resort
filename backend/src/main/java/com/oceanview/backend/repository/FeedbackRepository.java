package com.oceanview.backend.repository;

import com.oceanview.backend.model.Feedback;
import com.oceanview.backend.model.FeedbackStatus;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface FeedbackRepository extends MongoRepository<Feedback, String> {
    List<Feedback> findByStatus(FeedbackStatus status);
}
