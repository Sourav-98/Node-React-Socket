// Main NodeJS app definition

const http = require('http');
const socketio = require('socket.io');

const expressServer = require('./server');

const httpServer = http.createServer(expressServer);

const SocketService = require('./services/SocketService/SocketService');
const io = socketio(httpServer, {
    path: "/chat-api"
});

// Use the socket connection service
SocketService(io);

let port = 5000;
let host = "localhost";

httpServer.listen(port, host, ()=>{
    console.log("NodeJS Http Server running on http://" + host + ":" + port + '\n');
});
