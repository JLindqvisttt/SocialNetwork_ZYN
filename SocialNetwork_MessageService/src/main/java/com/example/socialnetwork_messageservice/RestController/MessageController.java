package com.example.socialnetwork_messageservice.RestController;

import com.example.socialnetwork_messageservice.DTO.ApiResponse;
import com.example.socialnetwork_messageservice.DTO.ConversationDTO;
import com.example.socialnetwork_messageservice.DTO.MessagesDTO;
import com.example.socialnetwork_messageservice.Entity.Messages;
import com.example.socialnetwork_messageservice.Service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/message")
public class MessageController {

    @Autowired
    private MessageService messageService;

    @GetMapping("/messageByEmail")
    public List<Messages> getMessagesByUser(@RequestBody String userEmail) {
        return messageService.getMessagesByUser(userEmail);
    }
    @GetMapping("/messageConversation")
    public List<Messages> findMessageConversation(@RequestBody ConversationDTO conversationDTO) {
        return messageService.findMessageConversation(conversationDTO.getMessageUserEmailSent(), conversationDTO.getMessageUserEmailReceiver());
    }
    @PostMapping("/sendMessage")
    public ApiResponse sendMessage(@RequestBody MessagesDTO messagesDTO){
        return messageService.sendMessage(messagesDTO);
    }


    @GetMapping("/getMessageConversation/{userEmailSent}/{userEmailReceiver}")
    public List<Messages> findAllBymessageUserEmailSentAndMessageUserEmailReceiver(@PathVariable String userEmailSent, @PathVariable String userEmailReceiver ) {
        return messageService.findAllBymessageUserEmailSentAndMessageUserEmailReceiver(userEmailSent,userEmailReceiver);
    }

}
