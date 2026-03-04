package com.oceanview.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "invoices")
public class Invoice {
    @Id
    private String id;
    
    private String reservationId;
    private String guestId;
    private String guestName;
    private String roomName;
    private Double totalPrice;
    private java.time.LocalDateTime invoiceDate;
    private PaymentStatus paymentStatus;
}
