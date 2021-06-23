
exports.defaultHomeService = function(){
    return {
        service: "Default Service", 
        message: "Welcome to Node Socket.io Chat Service"
    }
}

exports.getUserRooms = function(){
    let rooms_list = [
        {
            room_id: "ROOM_001",
            room_name: "Default Room 1"
        }, 
        {
            room_id: "ROOM_002",
            room_name: "Default Room 2"
        }
    ];
    return rooms_list;
}

exports.error404Service = function(){
    return {
        service: "Default Service", 
        message: "Error 404 - Page Not Found"
    }
}
