package com.example.socialnetwork_postservice.RestController;

import com.example.socialnetwork_postservice.DTO.ApiResponse;
import com.example.socialnetwork_postservice.DTO.RelationWithDTO;
import com.example.socialnetwork_postservice.Entity.RelationWith;
import com.example.socialnetwork_postservice.Service.RelationWithService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/relationwith")
public class RelationWithController {

    @Autowired
    private RelationWithService relationWithService;

    @GetMapping("/relationAll/{userEmail}")
    public List<RelationWith> findAllByUserEmailFirst(@PathVariable String userEmail) {
        return relationWithService.findAllByUserEmailFirst(userEmail);
    }

    @GetMapping("/relationAll/{userEmail}/{userEmailSecond}")
    public List<RelationWith> findAllByUserEmailFirst(@PathVariable String userEmail, @PathVariable String userEmailSecond) {
        return relationWithService.findAllByUserEmailFirstAndUserEmailSecond(userEmail, userEmailSecond);
    }
    @PostMapping("/createRelationWith")
    public ApiResponse createRelationWith(@RequestBody RelationWithDTO relationWithDTO){
        return relationWithService.createRelationWith(relationWithDTO);
    }

    @PutMapping("/updateRelation")
    public ApiResponse updateRelation(@RequestBody RelationWith relationWithDTO){
        return relationWithService.updateRelation(relationWithDTO);
    }

    @DeleteMapping("/deleteRelationWith/{id}")
    public ApiResponse deleteById(@PathVariable int id) {
        return relationWithService.deleteById(id);
    }
}
