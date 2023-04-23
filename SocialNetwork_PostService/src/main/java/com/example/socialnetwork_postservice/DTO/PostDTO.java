package com.example.socialnetwork_postservice.DTO;

import java.util.Date;

public class PostDTO {

    private int id;

    private String userEmail;
    private String postsTitle;
    private String postsDescription;
    private Date postsCreatedDate;


    public int getId() {
        return id;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public String getPostsTitle() {
        return postsTitle;
    }

    public String getPostsDescription() {
        return postsDescription;
    }

    public Date getPostsCreatedDate() {
        return postsCreatedDate;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public void setPostsTitle(String postsTitle) {
        this.postsTitle = postsTitle;
    }

    public void setPostsDescription(String postsDescription) {
        this.postsDescription = postsDescription;
    }

    public void setPostsCreatedDate(Date postsCreatedDate) {
        this.postsCreatedDate = postsCreatedDate;
    }

    @Override
    public String toString() {
        return "PostsDTO{" +
                "id=" + id +
                ", userEmail='" + userEmail + '\'' +
                ", postsTitle='" + postsTitle + '\'' +
                ", postsDescription='" + postsDescription + '\'' +
                ", postsCreatedDate=" + postsCreatedDate +
                '}';
    }
}
