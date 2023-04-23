const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: '*',
    }
});
const dataCache = {};
io.on('connection', (socket)=> {
    console.log('User Online');
    try{
        socket.on("join", (room)=>{
            console.log("ROOM:" + room);
            socket.join(room);
            socket.to(room).emit('canvas-data', dataCache[room]);
            console.log(socket.rooms);
        });
    }catch(error)
    {
        console.error(error)
    }
    socket.on('disconnect', function(socket)
    {
        console.log("user disconnected");
    });

    socket.on('canvas-data', function(data) {
        socket.to(data.room).emit('canvas-data', data.canvasdata);
        dataCache[data.room] = data.canvasdata;
    })
    socket.on('leave-room', (room)=>{
        console.log("User: " + socket.id + " Left Room: " + room);
        socket.leave(room);
        console.log(socket.rooms);
    });
})

var server_port = process.env.YOUR_PORT || process.env.PORT || 5000;
http.listen(server_port, () => {
    console.log("Started on : "+ server_port);
})

//------------
const express = require('express');
const mysql = require('mysql');

const server = express();

// Set up connection to the database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'socialnetwork_canvas'
});

// Connect to the database
connection.connect((error) => {
    if (error) {
        console.error(error);
    } else {
        console.log('Connected to the database');
    }
});

// Set up a GET route to retrieve all rows from the table
server.get('/getAllCanvas', (req, res) => {
    connection.query('SELECT * FROM canvas', (error, rows) => {
        if (error) {
            console.error(error);
            res.sendStatus(500);
        } else {
            console.log("Test")
            res.send(rows);
        }
    });
});

// Set up a POST route to insert a new row into the table
server.post('/createCanvas', (req, res) => {
    const item = req.body;
    connection.query('INSERT INTO items SET ?', item, (error) => {
        if (error) {
            console.error(error);
            res.sendStatus(500);
        } else {
            res.sendStatus(201);
        }
    });
});
