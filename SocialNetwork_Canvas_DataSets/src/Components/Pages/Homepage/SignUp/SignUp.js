import * as React from 'react';
import "./SignUp.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from "react-router-dom";

import {useRef, useState} from "react";
import {register} from "../../../../Actions/UserActions/auth";
import {isEmail} from "validator";
import {useDispatch, useSelector} from "react-redux";
import Input from "react-validation/build/input";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import {Label} from "recharts";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const validEmail = (value) => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                This is not a valid email.
            </div>
        );
    }
};
const validLastname = (value) => {
    if (value.length < 2 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                The lastname must be between 2 and 20 characters.
            </div>
        );
    }
};

const validFirstname = (value) => {
    if (value.length < 2 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                The firstname must be between 2 and 20 characters.
            </div>
        );
    }
};

const validPassword = (value) => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                The password must be between 6 and 40 characters.
            </div>
        );
    }
};

const SignUp = (props) => {
    const form = useRef();
    const checkBtn = useRef();

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [successful, setSuccessful] = useState(false);

    const {message} = useSelector(state => state.message);
    const dispatch = useDispatch();

    const onChangeFirstname = (e) => {
        const firstname = e.target.value;
        setFirstname(firstname);
    };

    const onChangeLastname = (e) => {
        const lastname = e.target.value;
        setLastname(lastname);
    };
    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleRegister = (e) => {
        e.preventDefault();

        setSuccessful(false);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            dispatch(register(email, password, firstname, lastname))
                .then(() => {
                    setSuccessful(true);
                })
                .catch(() => {
                    setSuccessful(false);
                });
        }
    };


    return (

        <div className="container-fluid ps-md-0">
            <div className="row g-0">
                <div className="col-md-8 col-lg-6 bg-dark text-light">
                    <div className="login d-flex align-items-center py-5">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-9 col-lg-8 mx-auto">
                                    <h3 className="login-heading mb-4">Sign up</h3>
                                    <Form className="text-dark" onSubmit={handleRegister} ref={form}>
                                        {!successful && (
                                            <div>
                                                <div className="form-floating mb-3">
                                                    <Input
                                                        type="email"
                                                        className="form-control form-control-lg"
                                                        name = "email"
                                                        value={email}
                                                        placeholder="name@example.com"
                                                        maxLength={65}
                                                        onChange={onChangeEmail}
                                                        validations={[required, validEmail]}
                                                    />
                                                </div>

                                                <div className="form-row">
                                                    <div className="form-floating mb-3">
                                                        <Input
                                                            value={firstname}
                                                            type="text"
                                                            maxLength={65}
                                                            className="form-control form-control-lg"
                                                            placeholder="First name"
                                                            onChange={onChangeFirstname}
                                                            validations={[required, validFirstname]}
                                                        />
                                                    </div>
                                                    <div className="form-floating mb-3">
                                                        <Input
                                                            value={lastname}
                                                            type="text"
                                                            maxLength={65}
                                                            className="form-control form-control-lg"
                                                            placeholder="Last name"
                                                            onChange={onChangeLastname}
                                                            validations={[required, validLastname]}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-floating mb-3">
                                                    <Input
                                                        type="password"
                                                        className="form-control form-control-lg"
                                                        value={password}
                                                        maxLength={65}
                                                        id="floatingPassword"
                                                        placeholder="Password"
                                                        onChange={onChangePassword}
                                                        validations={[required, validPassword]}
                                                    />
                                                </div>

                                                <div className="form-group">
                                                    <button
                                                        className="btn btn-lg bg-image btn-login text-light text-uppercase fw-bold mb-2">Register
                                                    </button>
                                                </div>
                                                <div className="row">
                                                    <div className="col-ml-auto">
                                                        <Link to="/">
                                                            <button
                                                                className="btn btn-lg btn-primary btn-login text-light text-uppercase fw-bold mb-2"
                                                                >Sign in
                                                            </button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {message && (
                                            <div className="form-group">
                                                <div
                                                    className={successful ? "alert alert-success" : "alert alert-danger"}
                                                    role="alert">
                                                    {message}
                                                </div>
                                                <div className="row">
                                                    <div className="col-ml-auto">
                                                        <Link to="/">
                                                            <button
                                                                className="btn btn-lg btn-primary btn-login text-light text-uppercase fw-bold mb-2"
                                                            >Sign in
                                                            </button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        <CheckButton style={{display: "none"}} ref={checkBtn}/>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image">
                    <div className="col-md col-lg-12">
                        <div className="login d-flex align-items-center py-5">
                            <div className="col-md-6 mx-auto" align="center">
                                <h3 className="login-title mb-xxl-auto text-light">Create a new account </h3>
                                <h4>Get social and unite together </h4>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
export default SignUp;