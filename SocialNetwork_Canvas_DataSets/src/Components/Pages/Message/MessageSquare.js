import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap';

import {connect, useSelector} from "react-redux";
import {Button, Form} from "react-bootstrap";
import {Navigate, NavLink} from "react-router-dom";
import axios from "axios";
import {useEffect, useState, useRef} from "react";
import Moment from 'moment';


const MessageSquare = (props) => {
    const {user: currentUser} = useSelector((state) => state.auth);


    const [theMessage, setTheMessage] = useState("");
    const [theMessageError, setTheMessageError] = useState([]);
    const [conversationData, setConversationData] = useState([]);
    const [update, setupdate] = useState();
    const messageEndRef = useRef(null)

    useEffect(() => {
        //console.log(config)
        axios.get("https://localhost:8086/api/message/getMessageConversation/" + currentUser.email + "/" + props.messageProfileName, {
            headers: {
                Authorization: `Bearer ${currentUser.token}`,
                userEmail: currentUser.email
            }
        }).then(resOne => {
            setConversationData(resOne.data);
        })
            .catch(e => {
                console.log(e.message)
            })
        scrollToBottom();
        setupdate(false);
    }, [props.messageProfileName, update]);


    const getFormattedDate = (dateStr) => {
        const date = new Date(dateStr);
        const formattedDate = Moment(date).format('llll');
        return formattedDate.toLocaleString();
    }
    const scrollToBottom = () => {
        messageEndRef.current?.scrollIntoView({behaviour: "smooth"});
    }

    function sendMessage() {
        setupdate(true);
        if (currentUser.email !== null) {
            if (theMessage.localeCompare("") !== 0) {
                const newMessage = {
                    messageSentTime: Date.now(),
                    messageUserEmailReceiver: props.messageProfileName,
                    messageUserEmailSent: currentUser.email,
                    messageUserSentMessage: theMessage,
                }
                axios.post("https://localhost:8086/api/message/sendMessage", newMessage, {
                    headers: {
                        Authorization: `Bearer ${currentUser.token}`,
                        userEmail: currentUser.email
                    }
                }).then(response => setTheMessageError(response.data))
                setTheMessage("");
            }
        }
    }

    return (
        <div>
            <div hidden={props.messageProfileName}>
                <div className="alert alert-success" role="alert">
                    <h4 className="alert-heading">Start a message with a friend</h4>
                    <p className="mb-0">Click on a name to start a conversation. </p>
                </div>
            </div>
            <div hidden={!props.messageProfileName}>
                <div style={{borderBottom: '3px solid #0d6efd', height: '50vh', overflowY: 'scroll'}}>
                    {
                        conversationData.map(con => {
                            return (
                                <div>
                                    <p className="text-primary">{con.messageUserEmailSent} Sent
                                        date: {getFormattedDate(con.messageSentTime)} </p>
                                    <p style={{borderBottom: '1px solid #0d6efd'}}>
                                        <strong>{con.messageUserSentMessage}</strong></p>
                                </div>
                            );

                        })}
                    <div ref={messageEndRef} style={{height: '10vh'}}/>
                </div>
                <Form className="d-flex">
                    <Form.Control
                        type="text"
                        placeholder="Enter a message"
                        className="me-2"
                        required
                        maxLengt={300}
                        value={theMessage}
                        onChange={(e) => {
                            setTheMessage(e.target.value)
                        }}
                    />
                    <NavLink>
                        <Button onClick={() => {
                            sendMessage();
                        }}>Send</Button>
                    </NavLink>
                </Form>
            </div>
        </div>

    );
}
export default MessageSquare;