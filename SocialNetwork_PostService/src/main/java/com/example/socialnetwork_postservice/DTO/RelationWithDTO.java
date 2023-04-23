package com.example.socialnetwork_postservice.DTO;

import java.util.Date;

public class RelationWithDTO {

    private int id;
    private String userEmailFirst;
    private String userEmailSecond;
    private Date relationWithDate;
    private int relationStatus;

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

    public int getRelationStatus() {
        return relationStatus;
    }

    public void setRelationStatus(int relationStatus) {
        this.relationStatus = relationStatus;
    }

    @Override
    public String toString() {
        return "RelationWithDTO{" +
                "id=" + id +
                ", userEmailFirst='" + userEmailFirst + '\'' +
                ", userEmailSecond='" + userEmailSecond + '\'' +
                ", relationWithDate=" + relationWithDate +
                ", relationStatus=" + relationStatus +
                '}';
    }
}
