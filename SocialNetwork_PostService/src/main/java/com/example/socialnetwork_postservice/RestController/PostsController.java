package com.example.socialnetwork_postservice.RestController;

import com.example.socialnetwork_postservice.DTO.ApiResponse;
import com.example.socialnetwork_postservice.DTO.PostDTO;
import com.example.socialnetwork_postservice.Entity.Post;
import com.example.socialnetwork_postservice.Service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/post")
public class PostsController {
  @Autowired
  private PostService postsService;

  @GetMapping("/all")
  public List<Post> findAllPosts() {
    return postsService.findAllPosts();
  }

  @GetMapping("/postsByUserEmail/{userEmail}")
  public List<Post> findAllByUserEmail(@PathVariable String userEmail) {
    return postsService.findAllByUserEmail(userEmail);
  }

  @GetMapping("/friendPosts/{userEmail}")
  public List<Post> findAllFriendsPostsByUserEmail(@PathVariable String userEmail) {
    return postsService.findAllFriendsPostsByUserEmail(userEmail);
  }

  @PostMapping("/createPost")
  public ApiResponse createPost(@RequestBody PostDTO postsDTO) {
    return postsService.createPost(postsDTO);
  }
}
