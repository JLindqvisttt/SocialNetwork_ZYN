package com.example.socialnetwork_canvasservice.Service;

import com.example.socialnetwork_canvasservice.DTO.ApiResponse;
import com.example.socialnetwork_canvasservice.DTO.CanvasDTO;
import com.example.socialnetwork_canvasservice.Entity.Canvas;

import java.util.List;

public interface CanvasService {
    List<Canvas> getAll();

    ApiResponse createCanvas(String canvasCreator);

    ApiResponse saveCanvas(CanvasDTO canvasDTO);
}
