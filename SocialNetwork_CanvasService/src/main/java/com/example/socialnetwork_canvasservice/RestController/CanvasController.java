package com.example.socialnetwork_canvasservice.RestController;

import com.example.socialnetwork_canvasservice.DTO.ApiResponse;
import com.example.socialnetwork_canvasservice.DTO.CanvasDTO;
import com.example.socialnetwork_canvasservice.Entity.Canvas;
import com.example.socialnetwork_canvasservice.Service.CanvasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/canvas")
public class CanvasController {
    @Autowired
    private CanvasService canvasService;
    @GetMapping("/getAllCanvas")
    public List<Canvas> getAllCanvas(){
        return canvasService.getAll();
    }
    @PostMapping("/createCanvas")
    public ApiResponse createCanvas(@PathVariable String canvasCreator){
        return canvasService.createCanvas(canvasCreator);
    }
    @PostMapping("/saveCanvas")
    public ApiResponse saveCanvas(@RequestBody CanvasDTO canvasDto){
        return canvasService.saveCanvas(canvasDto);
    }
}
