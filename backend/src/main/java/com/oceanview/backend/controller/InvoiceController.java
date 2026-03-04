package com.oceanview.backend.controller;

import com.oceanview.backend.model.Invoice;
import com.oceanview.backend.service.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/invoices")
@CrossOrigin(origins = "http://localhost:5173")
public class InvoiceController {

    @Autowired
    private InvoiceService invoiceService;

    @GetMapping
    public List<Invoice> getAllInvoices() {
        return invoiceService.getAllInvoices();
    }

    @GetMapping("/reservation/{reservationId}")
    public ResponseEntity<Invoice> getInvoiceByReservationId(@PathVariable String reservationId) {
        Invoice invoice = invoiceService.getInvoiceByReservationId(reservationId);
        if (invoice != null) {
            return ResponseEntity.ok(invoice);
        }
        return ResponseEntity.notFound().build();
    }
}
