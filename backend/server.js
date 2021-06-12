
const express = require('express');
// const cors = require('cors');
const app = express();

// app.use(cors());
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
