import React from "react";
import "./Navbar.css";
import {NavLink} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap';
import {Button, Form} from "react-bootstrap";



const NavBarHead = () => {
    const [searchTerm, setSearchTerm] = React.useState(null);

    const handleChange = event => {
        setSearchTerm(event.target.value);
    };

    return (
        <>
            <nav className="navbar navbar-light justify-content-between"
                 style={{height: '76px', position: 'fixed', width: '100%', backgroundColor:'#131316'}}>
                <a className="navbar-brand bg-image text-decoration-none login-title-2"></a>
                <Form className="d-flex" style={{minWidth: '30vh', marginRight: '10px'}}>
                    <Form.Control
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                        required
                        value={searchTerm}
                        onChange={handleChange}
                    />

                    <NavLink to={{pathname: "/UserProfile/" + searchTerm}} hidden={searchTerm == (null)}>
                        <Button type="submit">Search</Button>
                    </NavLink>

                    <NavLink>
                        <Button type="submit" hidden={searchTerm != (null)}>Search</Button>
                    </NavLink>
                </Form>
            </nav>
        </>
    );
};
export default NavBarHead;

