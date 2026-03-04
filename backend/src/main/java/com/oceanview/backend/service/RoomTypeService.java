package com.oceanview.backend.service;

import com.oceanview.backend.model.RoomType;
import com.oceanview.backend.repository.RoomTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomTypeService {

    @Autowired
    private RoomTypeRepository roomTypeRepository;

    public List<RoomType> getAllRoomTypes() {
        return roomTypeRepository.findAll();
    }

    public RoomType getRoomTypeById(String id) {
        return roomTypeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room category not found"));
    }

    public RoomType createRoomType(RoomType roomType) {
        if (roomTypeRepository.existsByName(roomType.getName())) {
            throw new RuntimeException("Room category name already exists");
        }
        return roomTypeRepository.save(roomType);
    }

    public RoomType updateRoomType(String id, RoomType roomTypeDetails) {
        RoomType roomType = getRoomTypeById(id);
        roomType.setName(roomTypeDetails.getName());
        return roomTypeRepository.save(roomType);
    }

    public void deleteRoomType(String id) {
        roomTypeRepository.deleteById(id);
    }
}
