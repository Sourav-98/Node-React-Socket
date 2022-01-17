
const { Connection } = require('../../util/dbConn');
const { ChatUserDAO } = require('./../../repositoryDAO/ChatUserDAO');

exports.getAllChatUsers = async function(){
    try{
        await this.dummySleepAsync();
        return await ChatUserDAO.findAll();
    }catch(err){
        console.log("Error at getAllChatUsers() service -> " + err);
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
    return new Promise((resolve)=>{
        setTimeout(resolve, interval);
    });
};

exports.dummySleepAsync = async function(interval){
    await new Promise((resolve)=>{
        setTimeout(resolve, interval);
    });
}
