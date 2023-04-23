package com.example.socialnetwork_messageservice.Service;

import com.example.socialnetwork_messageservice.DTO.ApiResponse;
import com.example.socialnetwork_messageservice.DTO.MessagesDTO;
import com.example.socialnetwork_messageservice.Entity.Messages;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface MessageService {

    List<Messages> getMessagesByUser(String userName);
    ApiResponse sendMessage(MessagesDTO messagesDTO);
    List<Messages> findMessageConversation(@RequestBody String messageUserEmailSent, String messageUserEmailReceiver);

    List<Messages> findAllBymessageUserEmailSentAndMessageUserEmailReceiver(String messageUserEmailSent, String messageUserEmailReceiver);
}
