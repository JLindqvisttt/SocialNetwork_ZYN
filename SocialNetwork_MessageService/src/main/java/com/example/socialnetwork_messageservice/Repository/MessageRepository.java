package com.example.socialnetwork_messageservice.Repository;

import com.example.socialnetwork_messageservice.Entity.Messages;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Messages, Integer> {

    //Klickar på ett namn, dvs hämtar den personens konversation
    List<Messages> findByMessageUserEmailSent(String messageUserEmailSent);

    @Query("select m from Messages m where m.messageUserEmailSent =:firstUserEmail" +
            " and m.messageUserEmailReceiver=:secondUserEmail or " +
            "m.messageUserEmailSent=:secondUserEmail and m.messageUserEmailReceiver=:firstUserEmail " +
            "ORDER BY m.messageSentTime")
    List<Messages> findMessageConversation(
            @Param("firstUserEmail") String firstUserEmail,
            @Param("secondUserEmail") String secondUserEmail);

    @Query("select m from Messages m where m.messageUserEmailSent =:firstUserEmail" +
            " and m.messageUserEmailReceiver=:secondUserEmail or " +
            "m.messageUserEmailSent=:secondUserEmail and m.messageUserEmailReceiver=:firstUserEmail " +
            "ORDER BY m.messageSentTime")
    List<Messages> findAllBymessageUserEmailSentAndMessageUserEmailReceiver(   @Param("firstUserEmail") String firstUserEmail,
                                                                               @Param("secondUserEmail") String secondUserEmail);
}
