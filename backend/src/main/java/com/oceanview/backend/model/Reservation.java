package com.oceanview.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "reservations")
public class Reservation {
    @Id
    private String id;
    
    private String guestId;
    private String roomId;
    
    private LocalDate checkIn;
    private LocalDate checkOut;
    
    private Double totalCost;
    private Integer totalNights;
    
    private ReservationStatus status;
    private String notes;
    private PaymentStatus paymentStatus;

    // Contact details for guest specifically for this reservation
    private String guestAddress;
    private String guestPhone;
}
