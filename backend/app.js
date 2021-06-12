// Main NodeJS app definition

const http = require('http');
const socketio = require('socket.io');

const expressServer = require('./server');

const httpServer = http.createServer(expressServer);

const io = socketio(httpServer);

io.on("connection", (socket)=>{

    console.log("New Socket Connection - Socket ID: " + socket.id + "\n");

    socket.on("client-disconnect", ()=>{
        console.log("Disconnection Request from " + socket.id + " ----- ");
        socket.disconnect(true);
    })

    socket.on("disconnect", ()=>{
        console.log("DISCONNECTED: " + socket.id + "\n");
    });
});

let port = 5000;
let host = "localhost";

httpServer.listen(port, host, ()=>{
    console.log("NodeJS Http Server running on http://" + host + ":" + port + '\n');
});
