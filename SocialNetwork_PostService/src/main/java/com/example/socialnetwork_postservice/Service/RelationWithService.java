package com.example.socialnetwork_postservice.Service;

import com.example.socialnetwork_postservice.DTO.ApiResponse;
import com.example.socialnetwork_postservice.DTO.RelationWithDTO;
import com.example.socialnetwork_postservice.Entity.RelationWith;

import java.util.List;

public interface RelationWithService {

    List<RelationWith> findAllByUserEmailFirst(String userEmail);

    List<RelationWith> findAllByUserEmailFirstAndUserEmailSecond(String userEmailFirst, String userEmailSecond);

    ApiResponse createRelationWith(RelationWithDTO relationWithDTO);

    ApiResponse updateRelation(RelationWith relationWithDTO);

    ApiResponse deleteById(int id);


}
