package com.oceanview.backend.service;

import com.oceanview.backend.model.Room;
import com.oceanview.backend.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomService {

    @Autowired
    private RoomRepository roomRepository;

    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    public Room getRoomById(String id) {
        return roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found"));
    }

    public Room createRoom(Room room) {
        return roomRepository.save(room);
    }

    public Room updateRoom(String id, Room roomDetails) {
        Room room = getRoomById(id);
        room.setName(roomDetails.getName());
        room.setRoomTypeId(roomDetails.getRoomTypeId());
        room.setStatus(roomDetails.getStatus());
        room.setDescription(roomDetails.getDescription());
        room.setAmenities(roomDetails.getAmenities());
        room.setRate(roomDetails.getRate());
        room.setCapacity(roomDetails.getCapacity());
        room.setImage1(roomDetails.getImage1());
        room.setImage2(roomDetails.getImage2());
        room.setImage3(roomDetails.getImage3());
        return roomRepository.save(room);
    }

    public void deleteRoom(String id) {
        roomRepository.deleteById(id);
    }
}
