import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap';
import NavBarHead from "../../Navbar/NavBarHead";
import Sidebar from "../../Navbar/Sidebar";
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {Table} from "react-bootstrap";

import axios from "axios";

const AdminPage = () => {

    const {user: currentUser} = useSelector((state) => state.auth);
    const [alluser, setalluser] = useState([]);
    let userInfoData = "https://localhost:8085/api/auth/getAllUser";
    const requestOne = axios.get(userInfoData);
    useEffect(() => {
        axios.all([requestOne])
            .then(axios.spread((...responses) => {
                const responseOne = responses[0]
                setalluser(responseOne.data)
            })).catch(errors => {
            console.log(errors)
        })
    }, []);

    if (!currentUser || currentUser.roles.toString() === 'ROLE_USER') {
        return <Navigate to="/"/>;
    }

    return (
        <div>
            <NavBarHead/>
            <Sidebar/>
            <div className="container" style={{paddingTop: '15vh', paddingBottom: '15vh', height: '100vh'}}>
                <div className="row justify-content-md-center">
                    <div className="col-md-8">
                        <h1 className="text-primary text-center">Admin page</h1>
                        <br/>
                        <br/>
                        <hr/>
                        <h3>All the users</h3>
                        <Table striped bordered hover>
                            <thead className="bg-dark text-white">
                            <tr>
                                <th>UserID</th>
                                <th>Email</th>
                                <th>Firstname</th>
                                <th>Lastname</th>
                                <th>Roles</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                alluser.map(user =>
                                    <tr>
                                        <td>{user.id}</td>
                                        <td>{user.email}</td>
                                        <td>{user.firstname}</td>
                                        <td>{user.lastname}</td>
                                        <td>{user.roles[0].name}</td>
                                    </tr>
                                )
                            }
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default AdminPage;