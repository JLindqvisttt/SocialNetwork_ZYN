package com.example.socialnetwork_canvasservice.Service;

import com.example.socialnetwork_canvasservice.DTO.ApiResponse;
import com.example.socialnetwork_canvasservice.DTO.CanvasDTO;
import com.example.socialnetwork_canvasservice.Entity.Canvas;
import com.example.socialnetwork_canvasservice.Repository.CanvasRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CanvasServiceImp implements CanvasService{
    @Autowired
    private CanvasRepository canvasRepository;

    @Override
    public List<Canvas> getAll() {
        return canvasRepository.findAll();
    }

    @Override
    public ApiResponse createCanvas(String canvasCreator) {
        Canvas canvas = new Canvas();
        canvasRepository.save(canvas);
        return new ApiResponse(201, "Successfully created post", canvas);
    }

    @Override
    public ApiResponse saveCanvas(CanvasDTO canvasDTO) {
        if(validateCanvasName(canvasDTO)) return new ApiResponse(500, "Already exit with that name",null);
        Canvas canvas = new Canvas();
        BeanUtils.copyProperties(canvasDTO,canvas);
        canvasRepository.save(canvas);
        return new ApiResponse(200, "Successful saved",canvas);
    }
    private boolean validateCanvasName(CanvasDTO canvasDTO) {
        Canvas canvas = canvasRepository.findAllByCanvasName(canvasDTO.getCanvasName());
        if(canvas!=null) return true;
        return false;
    }
}
