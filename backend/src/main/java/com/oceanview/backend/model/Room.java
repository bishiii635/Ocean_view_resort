package com.oceanview.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "rooms")
public class Room {
    @Id
    private String id;
    private String name;
    
    private String roomTypeId; // Storing as ID string as per prompt
    
    private RoomStatus status;
    private String description;
    private List<String> amenities;
    private Double rate;
    private Integer capacity;
    
    private String image1;
    private String image2;
    private String image3;
}
