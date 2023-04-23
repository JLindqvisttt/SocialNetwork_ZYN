import React, {useState} from 'react';
import Board from '../Board/Board';

import './style.css';
import Select from "react-select";
import {Alert, Button} from "react-bootstrap";
import axios from "axios";
import {useSelector} from "react-redux";


const Container = (props) => {
    const { user: currentUser } = useSelector((state) => state.auth);
    const [canvasTitle, setcanvasTitle] = useState("");
    const [color, setcolor] = useState("#000000");
    const [size, setsize] = useState("5");
    const [status, setstatus] = useState([]);
    const config ={
        headers: {
            Authorization: `Bearer ${currentUser.token}`,
            userEmail: currentUser.email
        }
    }
    function saveCanvasData() {
        if (!canvasTitle.localeCompare("")) return;
        const canvasBoard = document.querySelector('#board');
        if (canvasBoard != null) {
            axios.post('https://localhost:5000/saveCanvas', {
                canvasName: canvasTitle,
                dataURL: canvasBoard.toDataURL("image/png")
            }, config)
                .then(response =>
                    setstatus(response.data)
                )
        }
    }

    return (
        <div>
            <div className="container" hidden={!props.name}>
                <div className="tools-section" style={{paddingTop: '2vh'}}>
                    <h2 className="text-white">Rooms ID: {props.name}</h2>
                    <div className="color-picker-container">
                        Color : &nbsp;
                        <input type="color" value={color} onChange={event => setcolor(event.target.value)}/>
                    </div>
                    <div className="brushsize-container">
                        Select Brush Size : &nbsp;
                        <select className="form-control-sm" value={size}
                                onChange={event => setsize(event.target.value)}>
                            <option> 5</option>
                            <option> 10</option>
                            <option> 15</option>
                            <option> 20</option>
                            <option> 25</option>
                            <option> 30</option>
                        </select>
                    </div>

                </div>
                <div className="board-container" style={{height: '60vh'}}>
                    <Board color={color} size={size} name={props.name} leaveRoom={props.leaveRoom}
                           dataURL={props.dataURL} ></Board>
                    <div>
                        <br/>
                        <form className="form-group text-white">
                            <div className="form-control-sm">
                                <Alert variant="success"
                                       hidden={status.status === 500 || status.length === 0}>{status.message}</Alert>
                                <Alert variant="danger"
                                       hidden={status.status === 200 || status.length === 0}>{status.message}</Alert>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="floatingInput"
                                    placeholder="Enter a title for the canvas"
                                    value={canvasTitle}
                                    onChange={(e) => {
                                        setcanvasTitle(e.target.value);
                                    }}
                                    maxLength={65}
                                    required
                                />
                                <label htmlFor="floatingInput">Canvas title</label>

                                <Button
                                    className="form-control"
                                    onClick={() => {
                                        saveCanvasData()
                                    }}
                                >Save
                                </Button>
                            </div>
                            <br/>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Container