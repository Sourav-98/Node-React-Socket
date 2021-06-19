
const express = require('express');
// const cors = require('cors');
const app = express();

// app.use(cors());

let rooms_list = [
    {
        room_id: "ROOM_001",
        room_name: "Default Room 1"
    }, 
    {
        room_id: "ROOM_002",
        room_name: "Default Room 2"
    }
]

app.get("/get-rooms", (req, res)=>{
    res.send(JSON.stringify(rooms_list));
});

app.get("/", (req, res)=>{
    let defaultData = {
        "message" : "Hello World"
    };
    res.send(JSON.stringify(defaultData));
});

app.use('*', (req, res)=>{
    let errorData = {
        "message" : "404 - Url not found"
    };
    res.send(JSON.stringify(errorData));
});

module.exports = app;
