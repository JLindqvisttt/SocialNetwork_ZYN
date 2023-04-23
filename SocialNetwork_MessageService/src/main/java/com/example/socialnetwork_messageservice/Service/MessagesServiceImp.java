package com.example.socialnetwork_messageservice.Service;


import com.example.socialnetwork_messageservice.DTO.ApiResponse;
import com.example.socialnetwork_messageservice.DTO.MessagesDTO;
import com.example.socialnetwork_messageservice.Entity.Messages;
import com.example.socialnetwork_messageservice.Repository.MessageRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class MessagesServiceImp implements MessageService {

    @Autowired
    private MessageRepository messageRepository;
    @Override
    public List<Messages> getMessagesByUser(String userName) {
        return null;
    }
    @Override
    public List<Messages> findMessageConversation(String messageUserEmailSent, String messageUserEmailReceiver){
        return messageRepository.findMessageConversation(messageUserEmailSent, messageUserEmailReceiver);
    }
    @Override
    public List<Messages> findAllBymessageUserEmailSentAndMessageUserEmailReceiver(String messageUserEmailSent, String messageUserEmailReceiver){
        return messageRepository.findAllBymessageUserEmailSentAndMessageUserEmailReceiver(messageUserEmailSent, messageUserEmailReceiver);
    }
    @Override
    public ApiResponse sendMessage(MessagesDTO messagesDTO) {
        Messages message = new Messages();
        BeanUtils.copyProperties(messagesDTO, message);
        messageRepository.save(message);
        return new ApiResponse(201, "Successfully created message", message);
    }
}
