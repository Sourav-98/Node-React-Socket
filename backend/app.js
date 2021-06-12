// Main NodeJS app definition

const http = require('http');
const socketio = require('socket.io');

const expressServer = require('./server');

const httpServer = http.createServer(expressServer);

const io = socketio(httpServer);

io.on("connection", (socket)=>{
    // console.log("Connected via Socket.io");
    console.log(socket.id);

    // setTimeout(()=>{
    //     socket.disconnect(true);
    // }, 10000);

    socket.on("messageBCD", ()=>{
        // socket.emit("client-disconnect-success");
        console.log("Disconnect Requested by user: "+socket.id);
        socket.disconnect(true);
    })

    socket.on("disconnect", ()=>{
        console.log(socket.id + " disconnected...");
    });
});

let port = 5000;
let host = "localhost";

httpServer.listen(port, host, ()=>{
    console.log("NodeJS Http Server running on http://" + host + ":" + port + '\n');
});
