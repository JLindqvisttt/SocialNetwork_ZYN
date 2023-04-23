package com.example.socialnetwork_postservice.Repository;
import com.example.socialnetwork_postservice.DTO.ApiResponse;
import com.example.socialnetwork_postservice.Entity.RelationWith;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RelationWithRepository extends JpaRepository<RelationWith, Integer> {

    List<RelationWith> findAllByUserEmailFirst(String userEmailFirst);

    List<RelationWith> findAllByUserEmailFirstAndUserEmailSecond(String userEmailFirst, String userEmailSecond);

    ApiResponse deleteById(int id);
}
