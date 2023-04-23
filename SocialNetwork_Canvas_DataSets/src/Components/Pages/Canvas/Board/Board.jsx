import React from 'react';
import io from 'socket.io-client';
import './style.css';
import axios from "axios";
import {Button} from "react-bootstrap";
var roomName;
class Board extends React.Component {
    timeout;
    socket = io.connect("https://localhost:5000", {secure: true});

    ctx;
    isDrawing = false;
    canvas;

    constructor(props) {
        console.log("The room ID: " + props.name);
        roomName = props.name;
        super(props);



        if (props.dataURL !== null) {
            var root = this;
            var interval = setInterval(function () {
                if (root.isDrawing) return;
                root.isDrawing = true;
                clearInterval(interval);
                var image = new Image();
                var canvas = document.querySelector('#board');
                var ctx = canvas.getContext('2d');
                image.onload = function () {
                    ctx.drawImage(image, 0, 0);
                    root.isDrawing = false;
                };
                image.src = props.dataURL;
                root.socket.emit("canvas-data", {canvasdata: props.dataURL, room: roomName});
            }, 200)
        }

        this.socket.on("canvas-data", function (data) {

            var root = this;
            var interval = setInterval(function () {
                if (root.isDrawing) clearInterval(interval)
                root.isDrawing = true;
                clearInterval(interval);
                var image = new Image();
                var canvas = document.querySelector('#board');
                var ctx = canvas.getContext('2d');
                image.onload = function () {
                    ctx.drawImage(image, 0, 0);

                    root.isDrawing = false;
                };
                image.src = data;
            }, 200)

        })
        this.socket.emit("join", roomName);
    }


    componentDidMount() {
        this.drawOnCanvas();
    }

    componentWillReceiveProps(newProps) {
        this.ctx.strokeStyle = newProps.color;
        this.ctx.lineWidth = newProps.size;
    }

    drawOnCanvas() {
        var canvas = document.querySelector('#board');
        this.ctx = canvas.getContext('2d');
        var ctx = this.ctx;

        var sketch = document.querySelector('#sketch');
        var sketch_style = getComputedStyle(sketch);
        canvas.width = parseInt(sketch_style.getPropertyValue('width'));
        canvas.height = parseInt(sketch_style.getPropertyValue('height'));

        var mouse = {x: 0, y: 0};
        var last_mouse = {x: 0, y: 0};

        /* Mouse Capturing Work */
        canvas.addEventListener('mousemove', function (e) {
            last_mouse.x = mouse.x;
            last_mouse.y = mouse.y;

            mouse.x = e.pageX - this.offsetLeft;
            mouse.y = e.pageY - this.offsetTop;
        }, false);


        /* Drawing on Paint App */
        ctx.lineWidth = this.props.size;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.strokeStyle = this.props.color;

        canvas.addEventListener('mousedown', function (e) {
            console.log("Confirm")
            canvas.addEventListener('mousemove', onPaint, false);
        }, false);

        canvas.addEventListener('mouseup', function () {
            canvas.removeEventListener('mousemove', onPaint, false);
        }, false);

        var root = this;
        var onPaint = function () {
            ctx.beginPath();
            ctx.moveTo(last_mouse.x, last_mouse.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.closePath();
            ctx.stroke();

            if (root.timeout !== undefined) clearTimeout(root.timeout);
            root.timeout = setTimeout(function () {
                var base64ImageData = canvas.toDataURL("image/png");
                root.socket.emit("canvas-data", {canvasdata: base64ImageData, room: roomName});
                console.log("Emit to: " + roomName)
            }, 1000)
        };
    }
    leaveRoom1() {
        console.log("apa")
        this.socket.emit("leave-room", roomName);
        this.props.leaveRoom();
    }

    render() {
        return (
            <div className="sketch" id="sketch">
                <Button onClick={event => this.leaveRoom1()} className="btn btn-danger">Leave room</Button>
                <canvas className="board" id="board">  <Button>Leave room</Button></canvas>
            </div>
        )
    }
}


export default Board;