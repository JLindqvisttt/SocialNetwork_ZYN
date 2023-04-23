import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap';
import NavBarHead from "../../Navbar/NavBarHead";
import Sidebar from "../../Navbar/Sidebar";

import {useSelector} from "react-redux";
import {Button, Col, ListGroup, Row, Tab, Tabs} from "react-bootstrap";
import {useEffect, useState} from "react";
import axios from "axios";
import MessageSquare from "./MessageSquare";
import {Navigate} from "react-router-dom";


const Messages = (props) => {
    const { user: currentUser } = useSelector((state) => state.auth);


    const [data, setdata] = useState([]);
    const [messageProfileName, setmessageProfileName] = useState("");


    
    useEffect(() => {
        if (currentUser){
            axios.get( "https://localhost:8087/relationwith/relationAll/" + currentUser.email, {
                headers: {
                    Authorization: `Bearer ${currentUser.token}`,
                    userEmail: currentUser.email
                }})
                .then(resOne => {
                    setdata(resOne.data);
                    console.log(resOne.data);
                }).catch(e =>{
                console.log(e.message)
            })
        }
    }, []);

    if (!currentUser) {
        return <Navigate to="/" />
    }

    function checkFriend() {
        if (data.length === 0) {
            return <p className="stroke">No friends</p>
        }
    }
    return (
        <div>
            <NavBarHead/>
            <Sidebar/>
            <div className="container" style={{paddingTop: '15vh', position: 'static', height:'100vh'}}>
                <div className="row justify-content-md-center">
                    <div className="col-2" style={{height: '50vh', marginTop: '5vh'}}>
                        <Col>
                            <Tabs>
                                <Tab eventKey="friends" title="Friends" className="nav-tabs">
                                    <ListGroup className="bg-primary">
                                        {
                                            data.map(name => {

                                                if (name.relationStatus !== 2)
                                                    return <Button key={name.id} onClick={() => {
                                                        setmessageProfileName(name.userEmailSecond)
                                                    }}>{name.userEmailSecond}
                                                    </Button>
                                            })
                                        }
                                    </ListGroup>
                                </Tab>
                            </Tabs>
                        </Col>
                        {checkFriend()}
                    </div>
                    <div className="col">
                        <Row>
                            <Col>
                                <h1 className="text-primary text-center">Message room</h1>
                                <h4 className="text-center">Get social and have fun with your friends</h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{paddingTop:'10vh'}}>
                                <MessageSquare messageProfileName={messageProfileName}/>
                            </Col>
                        </Row>

                    </div>
                </div>
            </div>
        </div>

    );
}
export default Messages;