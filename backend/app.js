// Main NodeJS app definition

const http = require('http');
const https = require('https');
const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

const socketio = require('socket.io');
const dotenv = require('dotenv');

const { Connection } = require('./util/dbConn');
const { SocketConnection } = require('./util/socketServer/socketConn');

const expressServer = require('./server');

const SocketService = require('./services/SocketService/SocketService');

let privateKey = fs.readFileSync('./http-secure/privateKey.pem');
let certificate = fs.readFileSync('./http-secure/certificate.pem');

let credentials = {
    key: privateKey, 
    cert: certificate
}

const httpsServer = https.createServer(credentials, expressServer);

// establish the db connection
Connection.connect();

// create the socket server
SocketConnection.init(httpsServer, {       // creating the Socket.io server on the same port as that of the http server
    path: "/chat-api"
});

// const io = socketio(httpsServer, {       // creating the Socket.io server on the same port as that of the http server
//     path: "/chat-api"
// });

// Use the socket connection service
SocketService(SocketConnection.getSocketConnection());

let port = 6000;
let host = process.env['HOST'] || "localhost";

httpsServer.listen(port, ()=>{
    console.log("NodeJS Https Server running on https://" + host + ":" + port + '\n');
});
