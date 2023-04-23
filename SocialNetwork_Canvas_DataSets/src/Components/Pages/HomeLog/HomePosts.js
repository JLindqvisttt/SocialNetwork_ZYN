import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap';
import NavBarHead from "../../Navbar/NavBarHead";
import Sidebar from "../../Navbar/Sidebar";


import {connect, useSelector} from "react-redux";
import Posts from "./Posts";
import {Navigate} from "react-router-dom";

const HomePosts = () => {

    const { user: currentUser } = useSelector((state) => state.auth);

    if (!currentUser) {
        return <Navigate to="/" />;
    }

    return (
        <div>
            <NavBarHead/>
            <Sidebar/>
            <div className="container" style={{paddingTop:'15vh', paddingBottom:'15vh', height:'100vh'}}>
                <div className="row justify-content-md-center">
                    <div className="col-md-8">
                        <h1 className="text-primary text-center">The NewsFeed</h1>
                        <Posts/>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default HomePosts;