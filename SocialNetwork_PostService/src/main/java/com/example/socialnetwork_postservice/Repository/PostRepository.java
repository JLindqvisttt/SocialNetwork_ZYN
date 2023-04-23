package com.example.socialnetwork_postservice.Repository;

import com.example.socialnetwork_postservice.Entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer> {

    List<Post> findAllByUserEmail(String userEmail);

    List<Post> findAllByOrderByPostsCreatedDateDesc();

    @Query("select distinct p from Post p where p.userEmail in (select r.userEmailSecond from " +
            "RelationWith r where r.userEmailFirst=:userEmail and r.relationStatus=0) order by p.postsCreatedDate desc")
    List<Post> findAllFriendsPostsByUserEmail(@Param("userEmail") String userEmail);


    //Hämtar alla posts (Används på startsidan)
    // Hämtar en vecka bakåt


}
