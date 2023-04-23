package com.example.socialnetwork_postservice.Entity;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "RELATIONWITH")
public class RelationWith {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String userEmailFirst;
    private String userEmailSecond;
    private Date relationWithDate;
    private int relationStatus;

    public RelationWith(String userEmailFirst, String userEmailSecond, Date relationWithDate, int relationStatus) {
        this.userEmailFirst = userEmailFirst;
        this.userEmailSecond = userEmailSecond;
        this.relationWithDate = relationWithDate;
        this.relationStatus = relationStatus;
    }
    public RelationWith() {

    }


    public int getRelationStatus() {
        return relationStatus;
    }

    public void setRelationStatus(int relationStatus) {
        this.relationStatus = relationStatus;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUserEmailFirst() {
        return userEmailFirst;
    }

    public void setUserEmailFirst(String userEmailFirst) {
        this.userEmailFirst = userEmailFirst;
    }

    public String getUserEmailSecond() {
        return userEmailSecond;
    }

    public void setUserEmailSecond(String userEmailSecond) {
        this.userEmailSecond = userEmailSecond;
    }

    public Date getRelationWithDate() {
        return relationWithDate;
    }

    public void setRelationWithDate(Date relationWithDate) {
        this.relationWithDate = relationWithDate;
    }

    @Override
    public String toString() {
        return "RelationWith{" +
                "id=" + id +
                ", userEmailFirst='" + userEmailFirst + '\'' +
                ", userEmailSecond='" + userEmailSecond + '\'' +
                ", relationWithDate=" + relationWithDate +
                '}';
    }
}
