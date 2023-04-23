import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap';
import NavBarHead from "../../Navbar/NavBarHead";
import Sidebar from "../../Navbar/Sidebar";

import {useSelector} from "react-redux";
import {Card, Col, Row} from "react-bootstrap";
import "./Card.css"
import {useEffect, useState} from "react";
import axios from "axios";
import {Link, Navigate} from "react-router-dom";



const FindNewFriends = (props) => {

    const { user: currentUser } = useSelector((state) => state.auth);

    const[alluser,setalluser] = useState([]);

    useEffect(() => {
        let userInfoData = "https://localhost:8085/api/auth/getAllUser";
        const requestOne = axios.get(userInfoData);
        if(currentUser){
            axios.all([requestOne])
                .then(axios.spread((...responses) => {
                    const responseOne = responses[0]
                    setalluser(responseOne.data)
                })).catch(errors => {
                console.log(errors)
            })
        }

    },[]);

    function filterWayTheUser(alluserEmail){
        if(currentUser){
            if(currentUser.email.localeCompare(alluserEmail)) return false;
            return true;
        }
    }

    if (!currentUser) {
        return <Navigate to="/" />;
    }
    return (
        <div>
            <NavBarHead/>
            <Sidebar/>
            <div className="container" style={{paddingTop: '20vh', position: 'absolute', top: '0'}}>
                <div className="row justify-content-md-center">
                    <div className="col-5">
                    </div>
                    <div className="col-md">
                        <Row>
                            <Col>
                                <h1 className="text-primary text-center">Make new friends </h1>
                                <h4 className="text-center">Here can you find your new bestis</h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {
                                    alluser.map(user =>
                                        <Card className="bg-dark text-light cardProfile" hidden={filterWayTheUser(user.email)}>
                                            <Card.Body>
                                                <Card.Title className="text-info">{user.firstname + " " + user.lastname}</Card.Title>
                                                <Card.Text>
                                                    Hobbies,
                                                    Age
                                                    etc
                                                </Card.Text>
                                                <small className="text-muted">Email: {user.email} </small>
                                            </Card.Body>
                                            <Card.Footer className="text-center">
                                                <Link
                                                    className="btn btn-primary"
                                                    to={{pathname:"/UserProfile/" + user.email}}
                                                >
                                                    View profile
                                                </Link>
                                            </Card.Footer>
                                        </Card>
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
export default FindNewFriends;