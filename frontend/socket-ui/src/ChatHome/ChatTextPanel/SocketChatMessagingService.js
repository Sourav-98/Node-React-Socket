
export const SocketChatMessagingService = function(socket){
    socket.on("new-user-entry", (userData)=>{
        console.log("New user joined the room --- User Id: " + userData.user_id);
    });

    socket.on("user-exit", (userData)=>{
        console.log("User left the room --- User Id: " + userData.user_id);
    })
}
