package com.oceanview.backend.controller;

import com.oceanview.backend.dto.DashboardStatsDTO;
import com.oceanview.backend.model.*;
import com.oceanview.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "http://localhost:5173")
public class DashboardController {

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private InvoiceRepository invoiceRepository;

    @GetMapping("/stats")
    public DashboardStatsDTO getStats() {
        long totalRooms = roomRepository.count();
        long totalGuests = userRepository.findAll().stream()
                .filter(u -> u.getRole() == Role.GUEST)
                .count();
        long totalReservations = reservationRepository.count();
        long staffCapacity = userRepository.findAll().stream()
                .filter(u -> u.getRole() == Role.STAFF || u.getRole() == Role.ADMIN)
                .count();

        List<Invoice> allInvoices = invoiceRepository.findAll();
        double totalRevenue = allInvoices.stream()
                .mapToDouble(Invoice::getTotalPrice)
                .sum();

        // Group revenue by date
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        Map<String, Double> revenueByDate = allInvoices.stream()
                .collect(Collectors.groupingBy(
                        i -> i.getInvoiceDate().format(formatter),
                        Collectors.summingDouble(Invoice::getTotalPrice)
                ));

        List<DashboardStatsDTO.RevenuePoint> timeline = revenueByDate.entrySet().stream()
                .map(e -> new DashboardStatsDTO.RevenuePoint(e.getKey(), e.getValue()))
                .sorted(Comparator.comparing(DashboardStatsDTO.RevenuePoint::getDate))
                .collect(Collectors.toList());

        return new DashboardStatsDTO(
                totalRooms,
                totalGuests,
                totalReservations,
                staffCapacity,
                totalRevenue,
                timeline
        );
    }
}
