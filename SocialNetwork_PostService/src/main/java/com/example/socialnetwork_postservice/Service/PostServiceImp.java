package com.example.socialnetwork_postservice.Service;
import com.example.socialnetwork_postservice.DTO.ApiResponse;
import com.example.socialnetwork_postservice.DTO.PostDTO;
import com.example.socialnetwork_postservice.Entity.Post;
import com.example.socialnetwork_postservice.Repository.PostRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostServiceImp implements PostService {

    @Autowired
    private PostRepository postsRepository;

    @Override
    public List<Post> findAllPosts() {
        return postsRepository.findAllByOrderByPostsCreatedDateDesc();
    }

    @Override
    public List<Post> findAllByUserEmail(String userEmail) {
        return postsRepository.findAllByUserEmail(userEmail);
    }

    @Override
    public ApiResponse createPost(PostDTO postsDTO) {
        Post post = new Post();
        BeanUtils.copyProperties(postsDTO, post);
        System.out.println(post);
        postsRepository.save(post);
        return new ApiResponse(201, "Successfully created post", post);
    }

    @Override
    public List<Post> findAllFriendsPostsByUserEmail(String userEmail) {
        return postsRepository.findAllFriendsPostsByUserEmail(userEmail);
    }
}
