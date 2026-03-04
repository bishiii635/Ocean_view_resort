package com.oceanview.backend.repository;

import com.oceanview.backend.model.Invoice;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface InvoiceRepository extends MongoRepository<Invoice, String> {
    Optional<Invoice> findByReservationId(String reservationId);
}
