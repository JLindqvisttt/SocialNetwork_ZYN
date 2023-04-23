package com.example.socialnetwork_messageservice.DTO;

public class ConversationDTO {
    private String messageUserEmailSent;
    private String messageUserEmailReceiver;

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
}
