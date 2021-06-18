
module.exports = function(socketioServer){
    socketioServer.on('connection', (socket)=>{
        console.log("New Socket Connection - Socket ID: " + socket.id + "\n");
        // emit the new socket id
        socket.emit('new-socket-id', socket.id);

        socket.on("client-disconnect", ()=>{
            console.log("Disconnection Request from " + socket.id + " ----- ");
            socket.disconnect(true);
        })
    
        socket.on("disconnect", ()=>{
            console.log("DISCONNECTED: " + socket.id + "\n");
        });
    })
}
