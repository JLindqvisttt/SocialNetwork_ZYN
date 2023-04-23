package com.example.socialnetwork_postservice.Service;

import com.example.socialnetwork_postservice.DTO.ApiResponse;
import com.example.socialnetwork_postservice.DTO.RelationWithDTO;
import com.example.socialnetwork_postservice.Entity.RelationWith;
import com.example.socialnetwork_postservice.Repository.RelationWithRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RelationWithServiceImp implements RelationWithService {

    @Autowired
    private RelationWithRepository relationWithRepository;

    @Override
    public List<RelationWith> findAllByUserEmailFirst(String userEmail) {
        return relationWithRepository.findAllByUserEmailFirst(userEmail);
    }

    @Override
    public List<RelationWith> findAllByUserEmailFirstAndUserEmailSecond(String userEmailFirst, String userEmailSecond) {
        return relationWithRepository.findAllByUserEmailFirstAndUserEmailSecond(userEmailFirst, userEmailSecond);
    }

    @Override
    public ApiResponse createRelationWith(RelationWithDTO relationWithDTO) {
        RelationWith relation = new RelationWith();
        BeanUtils.copyProperties(relationWithDTO, relation);
        relationWithRepository.save(relation);
        return new ApiResponse(201, "Successfully created relation", relation);
    }


    @Override
    public ApiResponse updateRelation(RelationWith relationWithDTO) {
        relationWithRepository.save(relationWithDTO);
        return new ApiResponse(201, "Successfully updated relation", null);
    }


    @Override
    public ApiResponse deleteById(int id) {
         relationWithRepository.deleteById(id);
        return new ApiResponse(201, "Successfully deleted", null);
    }

}
