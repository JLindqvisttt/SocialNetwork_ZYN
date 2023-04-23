package com.example.socialnetwork_messageservice.DTO;

import java.util.Date;

public class MessagesDTO {
    private int id;

    private String messageUserEmailSent;
    private String messageUserEmailReceiver;
    private String messageUserSentMessage;
    private Date messageSentTime;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getMessageUserEmailSent() {
        return messageUserEmailSent;
    }

    public void setMessageUserEmailSent(String messageUserEmailSent) {
        this.messageUserEmailSent = messageUserEmailSent;
    }

    public String getMessageUserEmailReceiver() {
        return messageUserEmailReceiver;
    }

    public void setMessageUserEmailReceiver(String messageUserEmailReceiver) {
        this.messageUserEmailReceiver = messageUserEmailReceiver;
    }

    public String getMessageUserSentMessage() {
        return messageUserSentMessage;
    }

    public void setMessageUserSentMessage(String messageUserSentMessage) {
        this.messageUserSentMessage = messageUserSentMessage;
    }

    public Date getMessageSentTime() {
        return messageSentTime;
    }

    public void setMessageSentTime(Date messageSentTime) {
        this.messageSentTime = messageSentTime;
    }

    @Override
    public String toString() {
        return "MessagesDTO{" +
                "id=" + id +
                ", messageUserEmailSent='" + messageUserEmailSent + '\'' +
                ", messageUserEmailReceiver='" + messageUserEmailReceiver + '\'' +
                ", messageUserSentMessage='" + messageUserSentMessage + '\'' +
                ", messageSentTime=" + messageSentTime +
                '}';
    }
}
