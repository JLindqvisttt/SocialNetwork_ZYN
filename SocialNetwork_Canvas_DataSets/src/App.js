import "./App.css";
import React, {Component, useCallback, useEffect, useState} from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap';

import {Route, Routes, useLocation} from "react-router-dom";

import SignUp from "./Components/Pages/Homepage/SignUp/SignUp";
import FindNewFriends from "./Components/Pages/NewFriends/FindNewFriends";
import UserProfile from "./Components/Pages/Profile/UserProfile";
import Messages from "./Components/Pages/Message/Messages";
import FriendsPosts from "./Components/Pages/HomeLog/FriendsPosts";
import HomePosts from "./Components/Pages/HomeLog/HomePosts";

import CanvasPage from "./Components/Pages/Canvas/CanvasPage";
import Diagram from "./Components/Pages/Diagram/Diagram";
import LogIn from "./Components/Pages/Homepage/SignIn/LogIn";
import AuthVerify from "./Actions/Common/AuthVerify";
import AdminPage from "./Components/Pages/Admin/AdminPage";
import {useDispatch, useSelector} from "react-redux";
import {clearMessage} from "./Actions/UserActions/message";
import {logout} from "./Actions/UserActions/auth";
import EventBus from "./Actions/Common/EventBus";

const App = () => {

    const {user: currentUser} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    let location = useLocation();

    useEffect(() => {
        if (["/", "/signUp"].includes(location.pathname)) {
            dispatch(clearMessage()); // clear message when changing location
        }
    }, [dispatch, location]);

    const logOut = useCallback(() => {
        dispatch(logout());
    }, [dispatch]);

    useEffect(() => {
        EventBus.on("logout", () => {
            logOut();
        });

        return () => {
            EventBus.remove("logout");
        };
    }, [currentUser, logOut]);
    return (
        <div>
            <Routes>
                <Route exact path="/" element={<LogIn/>}/>
                <Route exact path="/Signup" element={<SignUp/>}/>


                <Route path="/HomePosts" element={<HomePosts/>}/>
                <Route path="/FriendsPosts" element={<FriendsPosts/>}/>
                <Route path="/CanvasPage" element={<CanvasPage/>}/>
                <Route path="/Diagram" element={<Diagram/>}/>

                <Route path="/FindNewFriends" element={<FindNewFriends/>}/>
                <Route path="/Messages" element={<Messages/>}/>
                <Route path="/UserProfile/:username" element={<UserProfile/>}/>

                <Route path="/AdminPage" element={<AdminPage/>}/>
            </Routes>

            <AuthVerify logOut={logOut}/>
        </div>

    );
}

export default App;
