const { Db } = require("mongodb");
const { dbConfig } = require("./util/db.config");


let global_rooms_list = Array();

// function getRoomsAll
Db.collection('rooms').find().toArray((err, rooms_result)=>{
    let roomsData = null;
    //result -  array of room objs
    rooms_result.forEach(room => {
        // room.storage_id_list -> list of _id
        let room_obj = {
            room_id: room._id,
            room_name: room.name
        };
        let storage_items = await Db.collection('storage').find({ _id: {$in : room.storage_i} }).toArray();
        room_obj.storage_items = storage_items;
        // Db.collection('storage').find({ _id: room.storage_id_list }).toArray((err, storage_res)=>{
        //     // all the storage objects
        //     // storage_res -> array of storage objects
        //     room_obj.storage_items = storage_res;
        // })
    });
})

