
export const SocketEventService = function(ioSocket, socketUpdater){
    ioSocket.on("new-socket-id", (id)=>{
        console.log("Id received from the server: "+ id);
        socketUpdater(id);
    });

    ioSocket.on('disconnect', ()=>{
        console.log("Socket User disconnected...");
        socketUpdater(null);
    });
}
