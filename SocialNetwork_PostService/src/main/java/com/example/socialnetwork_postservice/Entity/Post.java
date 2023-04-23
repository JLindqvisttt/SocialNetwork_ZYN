package com.example.socialnetwork_postservice.Entity;


import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "POSTS")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String userEmail;
    private String postsTitle;
    private String postsDescription;
    private Date postsCreatedDate;

    public Post(String userEmail, String postsTitle, String postsDescription, Date postsCreatedDate) {
        this.userEmail = userEmail;
        this.postsTitle = postsTitle;
        this.postsDescription = postsDescription;
        this.postsCreatedDate = postsCreatedDate;
    }

    public Post() {

    }



    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getPostsTitle() {
        return postsTitle;
    }

    public void setPostsTitle(String postsTitle) {
        this.postsTitle = postsTitle;
    }

    public String getPostsDescription() {
        return postsDescription;
    }

    public void setPostsDescription(String postsDescription) {
        this.postsDescription = postsDescription;
    }

    public Date getPostsCreatedDate() {
        return postsCreatedDate;
    }

    public void setPostsCreatedDate(Date postsCreatedDate) {
        this.postsCreatedDate = postsCreatedDate;
    }

    @Override
    public String toString() {
        return "Posts{" +
                "id=" + id +
                ", userEmail='" + userEmail + '\'' +
                ", postsTitle='" + postsTitle + '\'' +
                ", postsDescription='" + postsDescription + '\'' +
                ", postsCreatedDate=" + postsCreatedDate +
                '}';
    }
}
