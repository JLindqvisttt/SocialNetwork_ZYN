package com.example.socialnetwork_canvasservice.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "CANVAS")
public class Canvas {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(columnDefinition = "text")
    private String dataURL;
    @Column(name = "canvasName", unique = true)
    private String canvasName;

    public Canvas(String dataURL, String canvasName) {
        this.dataURL = dataURL;
        this.canvasName = canvasName;
    }

    public Canvas() {

    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDataURL() {
        return dataURL;
    }

    public void setDataURL(String dataURL) {
        this.dataURL = dataURL;
    }

    public String getCanvasName() {
        return canvasName;
    }

    public void setCanvasName(String canvasName) {
        this.canvasName = canvasName;
    }

    @Override
    public String toString() {
        return "Canvas{" +
                "id=" + id +
                ", dataURL='" + dataURL + '\'' +
                ", canvasName='" + canvasName + '\'' +
                '}';
    }
}
