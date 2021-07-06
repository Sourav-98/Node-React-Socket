
//retrieve the database connnection

const { Connection } = require('../util/dbConn');

exports.defaultHomeService = async function(){
    return {
        service: "Default Service", 
        message: "Welcome to Node Socket.io Chat Service"
    }
}

exports.getUserRooms = async function(){
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

exports.apiGetStudents = async function(){
    try{
        let data = await Connection._db.collection('students').find().toArray();
        return data;
    }
    catch(err){
        throw err;
    }
}

exports.error404Service = async function(){
    return {
        service: "Default Service", 
        message: "Error 404 - Route Not Found"
    }
}
