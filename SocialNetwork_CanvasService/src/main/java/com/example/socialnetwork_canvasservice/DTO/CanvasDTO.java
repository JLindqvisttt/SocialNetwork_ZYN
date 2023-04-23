package com.example.socialnetwork_canvasservice.DTO;

public class CanvasDTO {

    private String canvasName;
    private String dataURL;

    public String getCanvasName() {
        return canvasName;
    }

    public void setCanvasName(String canvasName) {
        this.canvasName = canvasName;
    }

    public String getDataURL() {
        return dataURL;
    }

    public void setDataURL(String dataURL) {
        this.dataURL = dataURL;
    }


    @Override
    public String toString() {
        return "CanvasDTO{" +
                "canvasName='" + canvasName + '\'' +
                ", canvasData='" + dataURL + '\'' +
                '}';
    }
}
