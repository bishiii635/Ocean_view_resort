package com.oceanview.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DashboardStatsDTO {
    private long totalRooms;
    private long totalGuests;
    private long totalReservations;
    private long staffCapacity;
    private double totalRevenue;
    private List<RevenuePoint> revenueTimeline;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class RevenuePoint {
        private String date;
        private double amount;
    }
}
