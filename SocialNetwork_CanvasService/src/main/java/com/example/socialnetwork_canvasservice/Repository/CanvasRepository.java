package com.example.socialnetwork_canvasservice.Repository;

import com.example.socialnetwork_canvasservice.Entity.Canvas;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CanvasRepository extends JpaRepository<Canvas, Integer> {
        List<Canvas> findAll();

        Canvas findAllByCanvasName(String canvasName);

}
