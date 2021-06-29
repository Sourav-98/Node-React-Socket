
const { Connection } = require('./../../util/db1');
const { ChatUser } = require('./../../models/ChatUser');


exports.getChatUsers = async function(){
    try{
        let chatUsers = await Connection._db.collection('chat-users').find().toArray();
        return chatUsers;

    }catch(err){
        throw err;
    }
}

exports.getChatUsersAlt = async function(){
    return Connection._db.collection('chat-users').find().toArray()
    .then(data =>{
        return data;
    })
    .catch(err =>{
        throw err;
    })
}

exports.getChatUsers1 = function(){
    let data = undefined;
    Connection._db.collection('chat-users').find().toArray((err, result)=>{
        if(err){
            throw err;
        }
        else{
            data = result;
            console.log("Inside the callback function");
            return result;
        }
    });
    console.log("Outside the callback function");
    return new Promise((resolve, reject)=>{
        resolve(data);
    });
}

exports.dummySleepPromise = function(interval){
    return new Promise((resolve, reject)=>{
        setTimeout(resolve, interval);
    });
};

exports.dummySleepAsync = async function(interval){
    await new Promise((resolve, reject)=>{
        setTimeout(resolve, interval);
    });
}


// exports.getRooms = function(){
//     let rooms_result = await Connection._db.collection('rooms').find().toArray();
//     let roomsData = [];

//     rooms_result.forEach(room => {
//         let room_obj = {
//             room_id: room._id,
//             room_name: room.name
//         };
//         let storage_items = await Connection._db.collection('storage').find({ _id: {$in : room.storage_i} }).toArray();
//         room_obj.storage_items = storage_items;
//         roomsData.push(room_obj);
//     });
//     res.send(roomsData);
// }

