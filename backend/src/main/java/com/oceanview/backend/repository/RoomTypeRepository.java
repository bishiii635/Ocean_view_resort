package com.oceanview.backend.repository;

import com.oceanview.backend.model.RoomType;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface RoomTypeRepository extends MongoRepository<RoomType, String> {
    Optional<RoomType> findByName(String name);
    boolean existsByName(String name);
}
