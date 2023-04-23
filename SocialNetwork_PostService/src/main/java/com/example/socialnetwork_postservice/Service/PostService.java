package com.example.socialnetwork_postservice.Service;
import com.example.socialnetwork_postservice.DTO.ApiResponse;
import com.example.socialnetwork_postservice.DTO.PostDTO;
import com.example.socialnetwork_postservice.Entity.Post;

import java.util.List;

public interface PostService {

    List<Post> findAllPosts();
    List<Post> findAllByUserEmail(String userEmail);

    ApiResponse createPost(PostDTO postsDTO);

    List<Post> findAllFriendsPostsByUserEmail(String userEmail);
}
