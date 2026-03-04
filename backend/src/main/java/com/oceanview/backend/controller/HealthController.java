package com.oceanview.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173") // Allow frontend access
public class HealthController {

    @Autowired
    private MongoTemplate mongoTemplate;

    @GetMapping("/db-check")
    public Map<String, Object> checkDbConnection() {
        Map<String, Object> response = new HashMap<>();
        try {
            // Check if we can reach the database
            mongoTemplate.getDb().listCollectionNames();
            response.put("status", "success");
            response.put("message", "Database connection successful!");
            response.put("database", mongoTemplate.getDb().getName());
        } catch (Exception e) {
            response.put("status", "error");
            response.put("message", "Database connection failed: " + e.getMessage());
        }
        return response;
    }
}
