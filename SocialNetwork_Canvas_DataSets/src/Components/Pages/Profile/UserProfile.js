import React, {useState} from 'react';
import {connect, useSelector} from "react-redux";

import axios from "axios";
import {Button, Col, ListGroup, Row, Tab, Tabs} from "react-bootstrap";
import NavBarHead from "../../Navbar/NavBarHead";
import Sidebar from "../../Navbar/Sidebar";
import Post from "./Post";
import {Navigate, NavLink, useParams} from "react-router-dom";


const UserProfile = (props) => {
    const {user: currentUser} = useSelector((state) => state.auth);


    const [pending, setpending] = useState(false);
    const {username} = useParams();
    const [id, setid] = useState(null);
    const [name, setname] = useState(username);

    const [deleteFirstEmail, setdeleteFirstEmail] = useState("");
    const [deleteSecondEmail, setdeleteSecondEmail] = useState("");

    const [feed, setfeed] = useState([]);
    const [data, setdata] = useState([]);
    const [userinfo, setuserinfo] = useState([]);
    const [relationstatus, setrelationstatus] = useState([]);
    const [friendRequestData, setfriendRequestData] = useState([]);


    React.useEffect(() => {
        if(currentUser){
            const config ={
                headers: {
                    Authorization: `Bearer ${currentUser.token}`,
                    userEmail: currentUser.email
                }
            }

            let feedData = "https://localhost:8087/api/post/postsByUserEmail/" + name;
            let friendsData = "https://localhost:8087/relationwith/relationAll/" + name;
            let userInfoData = "https://localhost:8085/api/auth/getUserInfo/" + name;
            let checkFriendStatus = "https://localhost:8087/relationwith/relationAll/" + currentUser.email + "/" + name;
            let friendRequest = "https://localhost:8087/relationwith/relationAll/" + name + "/" + currentUser.email;


            const requestOne = axios.get(feedData, config);
            const requestTwo = axios.get(friendsData, config);
            const requestThree = axios.get(userInfoData, config);
            const requestFour = axios.get(checkFriendStatus, config);
            const requestFive = axios.get(friendRequest, config);

            axios.all([requestOne, requestTwo, requestThree, requestFour, requestFive] )
                .then(axios.spread((...responses) => {
                    const responseOne = responses[0]
                    const responseTwo = responses[1]
                    const responseThree = responses[2]
                    const responseFour = responses[3]
                    const responseFive = responses[4];

                    setpending(false);
                    setfeed(responseOne.data)
                    setdata(responseTwo.data);
                    setuserinfo(responseThree.data)
                    setrelationstatus(responseFour.data);
                    setfriendRequestData(responseFive.data);
                })).catch(errors => {
                console.log(errors)
            })
        }
    }, [name, pending, id, deleteFirstEmail, deleteSecondEmail]);

    function addFriend() {
        if(currentUser){
            const config ={
                headers: {
                    Authorization: `Bearer ${currentUser.token}`,
                    userEmail: currentUser.email
                }
            }
            const friendRequest = {
                relationStatus: "2",
                relationWithDate: Date.now(),
                userEmailFirst: currentUser.email,
                userEmailSecond: userinfo.email
            }
            axios.post("https://localhost:8087/relationwith/createRelationWith", friendRequest, config).then(response => console.log(response.data))
            setpending(true);
        }
    }

    function acceptFriendRequest() {
        friendRequestData.map(name =>
            setid(name.id)
        )
        if (id !== null) {
            if(currentUser){
                const config ={
                    headers: {
                        Authorization: `Bearer ${currentUser.token}`,
                        userEmail: currentUser.email
                    }
                }
                const addfriendFirst = {
                    id: id,
                    relationStatus: "0",
                    relationWithDate: Date.now(),
                    userEmailFirst: currentUser.email,
                    userEmailSecond: userinfo.email
                }
                axios.put("https://localhost:8087/relationwith/updateRelation", addfriendFirst, config).then(response => console.log(response.data))

                const addfriendSecond = {
                    relationStatus: "0",
                    relationWithDate: Date.now(),
                    userEmailFirst: userinfo.email,
                    userEmailSecond: currentUser.email,
                }
                axios.post("https://localhost:8087/relationwith/createRelationWith", addfriendSecond, config).then(response => console.log(response.data))
                setpending(true)
            }
            }
    }


    function checkStatus() {
        if (relationstatus.length === 0 && name.localeCompare(currentUser.email) === 0) return <Button
            className="bg-image" disabled style={{borderBottom: "4px groove", color: 'black'}}><strong>Your
            profile</strong></Button>
        if (friendRequestData.length !== 0 && id === null) return <Button onClick={() => {
            acceptFriendRequest()
        }} hidden={relationstatus.length !== 0}>Accept friends request</Button>
        if (friendRequestData.length !== 0 && id !== null) return <Button onClick={() => {
            acceptFriendRequest()
        }} hidden={relationstatus.length !== 0}>Confirm friend request</Button>
        if (relationstatus.length === 0 && name.localeCompare(currentUser.email) !== 0) return <Button
            hidden={pending}
            onClick={() => {
                addFriend()
            }}>Be friends</Button>
    }


    function removefriendButtonPressed() {

        if (currentUser){
            const config ={
                headers: {
                    Authorization: `Bearer ${currentUser.token}`,
                    userEmail: currentUser.email
                }
            }
            friendRequestData.map(name =>
                setdeleteFirstEmail(name.id)
            )
            relationstatus.map(name =>
                setdeleteSecondEmail(name.id)
            )
            if (deleteFirstEmail.length !== 0) {
                axios.delete("https://localhost:8087/relationwith/deleteRelationWith/" + deleteFirstEmail, config).then(response => console.log(response.data))
                if (deleteSecondEmail.length !== 0) axios.delete("https://localhost:8087/relationwith/deleteRelationWith/" + deleteSecondEmail,
                    config).then(response => console.log(response.data))
            }
        }
    }

    function checkFriends(status) {
        if (status === 0) return "Friends"
        if (status === 2) return "Pending"
    }

    if (!currentUser) {
        return <Navigate to="/"/>;
    }
    return (
        <div>
            <NavBarHead/>
            <Sidebar/>

            <div className="container"
                 style={{paddingTop: '20vh', position: 'absolute', top: '0', width: "100%", height: '100vh'}}>

                <div className="row justify-content-md-center">
                    <div className="col-4"></div>
                    <div className="col-lg" hidden={userinfo.length !== 0}>
                        <div className="alert alert-danger" role="alert">
                            <h1 className="text-danger">Page not found</h1>
                            Didn't find a profile with the name you entered in the search box, try again with a correct
                            email this time.
                        </div>
                    </div>
                    <div className="col-lg" hidden={userinfo.length === 0}>
                        <Row>
                            <Col>
                                <div className="jumbotron fluid">
                                    {relationstatus.map((relationstatus, i) =>
                                        <Button style={{borderBottom: "4px groove"}} disabled
                                        >{checkFriends(relationstatus.relationStatus)}</Button>
                                    )[0]
                                    }
                                    {checkStatus(name.id)}
                                    <Button style={{borderBottom: "4px groove"}}
                                            hidden={relationstatus.length === 0 || relationstatus.at(0).relationStatus === 2}
                                            className="btn btn-danger" onClick={() => {
                                        removefriendButtonPressed();
                                    }}>Remove friend</Button>
                                    <h1> {userinfo.firstname + " " + userinfo.lastname}</h1>
                                    <h5>{name}</h5>
                                    <hr/>
                                    <p>Email addess: {userinfo.email}</p>

                                </div>

                            </Col>
                        </Row>
                        <Row>
                            <Col sm={3}>
                                <Tabs>
                                    <Tab eventKey="friends" title="Friends" className="nav-tabs">
                                        <ListGroup>
                                            {
                                                data.map(name => {
                                                    if (name.relationStatus !== 2)
                                                        return <NavLink
                                                            to={{pathname: "/UserProfile/" + name.userEmailSecond}}>
                                                            <Button onClick={() => {
                                                                setname(name.userEmailSecond)
                                                            }}>{name.userEmailSecond}
                                                            </Button>
                                                        </NavLink>
                                                })
                                            }
                                        </ListGroup>
                                    </Tab>
                                </Tabs>
                            </Col>
                            <Col>
                                {
                                    feed.map(post =>
                                        <Post key={post.id} author={post.userEmail} text={post.postsDescription}
                                              title={post.postsTitle}
                                              date={post.postsCreatedDate}/>
                                    )
                                }
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;