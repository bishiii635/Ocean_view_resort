package com.oceanview.backend.controller;

import com.oceanview.backend.model.RoomType;
import com.oceanview.backend.service.RoomTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/room-types")
@CrossOrigin(origins = "http://localhost:5173")
public class RoomTypeController {

    @Autowired
    private RoomTypeService roomTypeService;

    @GetMapping
    public List<RoomType> getAllRoomTypes() {
        return roomTypeService.getAllRoomTypes();
    }

    @GetMapping("/{id}")
    public ResponseEntity<RoomType> getRoomTypeById(@PathVariable String id) {
        return ResponseEntity.ok(roomTypeService.getRoomTypeById(id));
    }

    @PostMapping
    public ResponseEntity<RoomType> createRoomType(@RequestBody RoomType roomType) {
        try {
            return ResponseEntity.ok(roomTypeService.createRoomType(roomType));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<RoomType> updateRoomType(@PathVariable String id, @RequestBody RoomType roomType) {
        try {
            return ResponseEntity.ok(roomTypeService.updateRoomType(id, roomType));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteRoomType(@PathVariable String id) {
        try {
            roomTypeService.deleteRoomType(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
