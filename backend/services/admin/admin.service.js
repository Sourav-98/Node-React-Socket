
const { Connection } = require('../../util/dbConn');
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
    await this.dummySleepPromise(3000);
    return Connection._db.collection('chat-users').find().toArray()
    .then(data =>{
        this.dummySleepPromise(2000);
        console.log('---service---');
        console.log(data);
        return data;
    })
    .catch(err =>{
        throw err;
    })
}


//-------------- DELAY FUNCTIONS ---------------


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
