import React, {useState, useRef, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, Navigate, useNavigate} from 'react-router-dom';

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import {login} from "../../../../Actions/UserActions/auth";
import {IoEarthSharp} from "react-icons/io5";
import {clearMessage} from "../../../../Actions/UserActions/message";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const Login = () => {
    let navigate = useNavigate();

    const form = useRef();
    const checkBtn = useRef();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const {isLoggedIn} = useSelector(state => state.auth);
    const {message} = useSelector(state => state.message);

    const dispatch = useDispatch();

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleLogin = (e) => {
        e.preventDefault();

        setLoading(true);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            dispatch(login(username, password))
                .then(() => {
                    navigate("/HomePosts");
                })
                .catch(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    };

    if (isLoggedIn) {
        return <Navigate to="/HomePosts"/>;
    }

    return (
        <div className="container-fluid ps-md-0">

            <div className="row g-0">
                <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image">
                    <div className="col-md col-lg-12">
                        <div className="login d-flex align-items-center py-5">
                            <div className="col-md-6 mx-auto" align="center">
                                <h3 className="login-title mb-xxl-auto text-light">Welcome to the ZYN
                                    Network <IoEarthSharp className="text-dark"/></h3>
                                <h4>Get social and unite together </h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-8 col-lg-6 bg-dark text-light">
                    <div className="login d-flex align-items-center py-5">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-9 col-lg-8 mx-auto">
                                    <h3 className="login-heading mb-4">Sign In</h3>

                                    <Form className="text-dark" onSubmit={handleLogin} ref={form}>
                                        <div className="form-floating mb-3">

                                            <Input
                                                type="email"
                                                placeholder="name@example.com"
                                                className="form-control form-control-lg"
                                                name="username"
                                                id="userEmail"
                                                value={username}
                                                onChange={onChangeUsername}
                                                validations={[required]}
                                            />
                                        </div>

                                        <div className="form-floating mb-3">
                                            <Input
                                                type="password"
                                                className="form-control form-control-lg"
                                                name="password"
                                                value={password}
                                                placeholder="Password"
                                                id="floatingPassword"
                                                onChange={onChangePassword}
                                                validations={[required]}
                                            />
                                        </div>

                                        {message && (
                                            <div className="form-group-sm">
                                                <div className="alert alert-danger" role="alert">
                                                    {message}
                                                </div>
                                            </div>
                                        )}

                                        <CheckButton style={{display: "none"}} ref={checkBtn}/>
                                        <div className="row">
                                            <div className="col">
                                                <div className="form-group">
                                                    <button className="btn btn-lg btn-login btn-primary  fw-bold mb-2"
                                                            disabled={loading}>
                                                        {loading && (
                                                            <span className="spinner-border spinner-border-sm "></span>
                                                        )}
                                                        <span>Login</span>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="col-ml-auto">
                                                <Link to="/SignUp">
                                                    <button
                                                        className="btn btn-lg bg-image btn-login text-light text-uppercase fw-bold mb-2"
                                                        type="submit">Register
                                                    </button>
                                                </Link>
                                            </div>
                                            <div className="text-center">
                                                <a className="small" href="src/Components/Pages/Homepage/SignIn/LogIn#">Forgot
                                                    password?</a>
                                            </div>
                                        </div>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
