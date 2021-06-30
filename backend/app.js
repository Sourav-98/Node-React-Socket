// Main NodeJS app definition

const http = require('http');
const path = require('path');
const socketio = require('socket.io');
const dotenv = require('dotenv');

const { Connection } = require('./util/dbConn');

const SocketService = require('./services/SocketService/SocketService');

dotenv.config({path: path.join(__dirname , '.env')});

const expressServer = require('./server');

const httpServer = http.createServer(expressServer);

// establish the db connection
Connection.connect();

const io = socketio(httpServer, {       // creating the Socket.io server on the same port as that of the http server
    path: "/chat-api"
});

// Use the socket connection service
SocketService(io);

let port = process.env['PORT'];
let host = process.env['HOST'];

httpServer.listen(port, host, ()=>{
    console.log("NodeJS Http Server running on http://" + host + ":" + port + '\n');
});
