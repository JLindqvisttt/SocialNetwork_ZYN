import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap';
import NavBarHead from "../../Navbar/NavBarHead";
import Sidebar from "../../Navbar/Sidebar";

import {useSelector} from "react-redux";
import {Col, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import axios from "axios";
import Post from "../Profile/Post";
import {Navigate} from "react-router-dom";

const FriendsPosts = (props) => {


    const { user: currentUser } = useSelector((state) => state.auth);
    const [allposts, setallpost] = useState([]);

    useEffect(() => {
        if (currentUser){
            axios.get("https://localhost:8087/api/post/friendPosts/" + currentUser.email, {
                headers: {
                    Authorization: `Bearer ${currentUser.token}`,
                    userEmail: currentUser.email
                }
            })
                .then(resOne => {
                    setallpost(resOne.data);
                })
        }
    }, []);

    if (!currentUser) {
        return <Navigate to="/" />;
    }
    return (
        <div>
            <NavBarHead/>
            <Sidebar/>
            <div className="container" style={{paddingTop: '15vh'}}>
                <div className="row justify-content-md-center">
                    <div className="col-md">
                        <Row>
                            <Col>
                                <h1 className="text-primary text-center">Friend feed </h1>
                                <h4 className="text-center">Get social and have fun</h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {
                                    allposts.map(post =>
                                        <Post hidden={currentUser.email.localeCompare(post.userEmail)}
                                              key={post.id} author={post.userEmail} text={post.postsDescription}
                                              title={post.postsTitle}
                                              date={post.postsCreatedDate}
                                        />
                                    )
                                }
                            </Col>
                        </Row>

                    </div>
                </div>
            </div>
        </div>

    );
}
export default FriendsPosts;