import React, {useCallback} from 'react';
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import "./Sidebar.css"
import {logout} from "../../Actions/UserActions/auth";


const Sidebar = (props) => {
    const {user: currentUser} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    let roleAdmin = "ROLE_ADMIN";
    let roleUser = "ROLE_USER";
    const logOut = useCallback(() => {
        dispatch(logout());
    }, [dispatch]);


    return (
        <div style={{position: 'fixed', overflow: 'scroll initial', height: '100vh', zIndex: '1000'}}>
            <CDBSidebar>
                <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large "></i>} className="bg-image">
                    <a href="/HomePosts" className="text-decoration-none login-title-2" style={{color: 'inherit'}}>
                        Zyn Network
                    </a>
                </CDBSidebarHeader>

                <CDBSidebarContent className="sidebar-content" style={{backgroundColor: "#131316"}}>

                    <CDBSidebarMenu>
                        <NavLink exact to="/HomePosts" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="home text-primary">Home</CDBSidebarMenuItem>
                        </NavLink>

                        <NavLink exact to="/FriendsPosts" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="home text-primary">Friends posts</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="/Messages" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="comments text-primary">Messages</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="/Diagram" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="chart-pie animatedLine">Diagram</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="/CanvasPage" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="paint-brush animatedText">CanvasPage</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="/FindNewFriends" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="user-friends text-primary">Find New Friends</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink to={{
                            pathname: "/UserProfile/" + currentUser.email,
                        }} activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="user text-primary">{currentUser.email}</CDBSidebarMenuItem>
                        </NavLink>

                        <NavLink exact to="/" activeClassName="activeClicked" onClick={logOut}>
                            <CDBSidebarMenuItem icon="sign-out-alt text-danger">Sign out</CDBSidebarMenuItem>
                        </NavLink>
                        <div hidden={currentUser.roles.toString() === roleUser}>
                            <hr/>
                            <NavLink exact to="/AdminPage" activeClassName="activeClicked ">
                                <CDBSidebarMenuItem icon="lock-open text-info">Admin page </CDBSidebarMenuItem>
                            </NavLink>
                        </div>
                    </CDBSidebarMenu>
                </CDBSidebarContent>
            </CDBSidebar>
        </div>
    );
}

export default Sidebar;
