import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap';
import NavBarHead from "../../Navbar/NavBarHead";
import Sidebar from "../../Navbar/Sidebar";
import {Button, Col, Dropdown, DropdownButton, ListGroup, Row, Tab, Tabs} from "react-bootstrap";
import Container from "./Container/Container";
import {useState} from "react";
import "./Container/style.css"
import axios from "axios";
import Select from 'react-select'
import {Navigate, NavLink} from "react-router-dom";
import {useSelector} from "react-redux";

const CanvasPage = () => {

    const { user: currentUser } = useSelector((state) => state.auth);


    const [allCanvas, setallCanvas] = useState([]);
    const [createNewRoom, setcreateNewRoom] = useState(false);
    const [createNewRoomImage, setcreateNewRoomImage] = useState(false);
    const [roomsName, setroomsName] = useState();
    const [show, setshow] = useState();

    const [dataURL, setDataURL] = useState();
    const [leave, setleave] = useState(false);


    function setCanvasImage() {
        var e = document.getElementById("nameCanvas");
        {
            allCanvas.map((canvas) => {
                    if (canvas.canvasName.localeCompare(e.value) ===0) {
                        setDataURL(canvas.dataURL);
                    }
                }
            )
        }
    }

    function getAllCanvas() {
        if(currentUser){
            const config ={
                headers: {
                    Authorization: `Bearer ${currentUser.token}`,
                    userEmail: currentUser.email
                }
            }
            axios.get('https://localhost:5000/getAllCanvas', config)
                .then(response => {
                        setallCanvas(response.data)
                    }
                )
        }
    }

    function showContainer() {
        if (show) {
            return <Container name={roomsName} dataURL={dataURL} leave={leave} hidden={roomsName} leaveRoom={leaveRoom}/>
        }
    }

    function leaveRoom() {

        setleave(true);
        setshow(false);
        setroomsName(null);
        setDataURL(null);
    }

    const [selectedValue, setSelectedValue] = useState("");
    const handleChange = e => {
        setSelectedValue(e.value);
    }

    function showContainerImage() {
        return <div className=" bg-light text-dark" style={{
            boxShadow: '0 3px 10px rgb(0 0 0 / 0.6)',
            padding: '2vh',
            borderRadius: '1vh',
            display: 'grid',
            placeItems: 'center',
            alignContent: 'center'
        }} hidden={!createNewRoomImage}>
            <h4>New Room with a saved image {selectedValue}</h4>
            <form className="text-dark" onSubmit={e => { e.preventDefault()}}>
                <label htmlFor="floatingInput">Enter a rooms name/ID</label>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Room ID"
                        value={roomsName}
                        maxLength={15}
                        required
                        onChange={(e) => {
                            setroomsName(e.target.value);
                        }}
                    />
                </div>
                <label htmlFor="floatingInput">Choose a saved image, by CanvasName</label>

                <div className="form-group">
                    <select className="form-select " id={"nameCanvas"}
                            onChange={
                                handleChange
                            }>
                        {
                            allCanvas.map((canvas) =>
                                <option
                                    id={canvas.id}
                                    key={canvas.id}
                                >{canvas.canvasName} </option>
                            )
                        }
                    </select>
                </div>

                <br/>
                <div className="row">
                    <div className="col">
                        <Button
                            onClick={() => {
                                setcreateNewRoomImage(false)
                            }}
                            className="btn btn-lg btn-danger btn-login text-uppercase fw-bold mb-2"
                        >Close
                        </Button>
                    </div>
                    <div className="col">
                        <Button
                            type="submit"
                            onClick={() => {
                                if (roomsName != ""){
                                    setcreateNewRoomImage(false)
                                    setshow(true);
                                }
                                setCanvasImage();
                            }}
                            className="btn btn-lg btn-primary btn-login text-uppercase fw-bold mb-2"
                        > Create
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    }

    function showCreateNewRoom() {
        return <div className=" text-dark" style={{
            boxShadow: '0 3px 10px rgb(0 0 0 / 0.6)',
            padding: '2vh',
            borderRadius: '1vh',
            display: 'grid',
            placeItems: 'center',
            alignContent: 'center'
        }} hidden={!createNewRoom}>
            <h4>New Room or Join a active room </h4>
            <form className="text-dark " style={{width: '30vh'}} onSubmit={e => { e.preventDefault()}}>
                <label htmlFor="floatingInput">Enter a rooms name/ID</label>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Room ID"
                        value={roomsName}
                        maxLength={15}
                        required
                        onChange={(e) => {
                            setroomsName(e.target.value);
                        }}
                    />
                </div>

                <br/>
                <div className="row">
                    <div className="col">
                        <Button
                            onClick={() => {
                                setcreateNewRoom(false)
                            }}
                            className="btn btn-lg btn-danger btn-login text-uppercase fw-bold mb-2"
                        >Close
                        </Button>
                    </div>
                    <div className="col">
                        <Button
                            type="submit"
                            onClick={() => {
                                if (roomsName != ""){
                                    setcreateNewRoom(false)
                                    setshow(true);
                                }

                            }}
                            className="btn btn-lg btn-primary btn-login text-uppercase fw-bold mb-2"
                        > Create
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    }
    if (!currentUser) {
        return <Navigate to="/" />;
    }
    return (
        <div>
            <NavBarHead/>
            <Sidebar/>
            <div className="container" style={{paddingTop: '15vh', position: 'static', height: '100vh'}}>
                <div className="row justify-content-md-center">
                    <div className="col ">
                        <h1 className="text-primary animatedText text-center">Canvas</h1>
                        <div className="container-fluid" style={{marginTop: '5vh'}}>
                            <div className="row">
                                <div className="col-8">
                                    <div className="alert alert-success " role="alert">
                                        <h4 className="alert-heading">Start drawing</h4>
                                        <p className="mb-0">Either you start a new canvas or create with a saved image,
                                            or join a active one. </p>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="form-control-lg">
                                        <Button
                                            hidden={show}
                                            onClick={event => {
                                                setcreateNewRoom(true);
                                                setroomsName("")
                                                setcreateNewRoomImage(false)
                                            }}>New room with a blanked canvas /Join
                                        </Button>
                                    </div>
                                    <div className="form-control-lg">
                                        <Button
                                            hidden={show}
                                            onClick={event => {
                                                setcreateNewRoomImage(true)
                                                setroomsName("")
                                                setcreateNewRoom(false);
                                                getAllCanvas()
                                            }}>New room with an old image
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-md-center text-center">
                    <div className="col">
                        <div>{showCreateNewRoom()}</div>
                        <div>{showContainerImage()}</div>
                        <div style={{boxShadow: '0 3px 10px rgb(0 0 0 / 0.6)', width: 'auto', marginTop: '2vh'}}>
                            {showContainer()}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}


export default CanvasPage;