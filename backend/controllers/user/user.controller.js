
const userController = require('express').Router();

const { Connection } = require('./../../util/dbConn');


let chatLoadWindow = 20;

userController.get('/get-chat-thread-first', async(req, res)=>{
    let chatData = await Connection._db.collection('chat-data').find({}).toArray();
    let chatLength = chatData.length;
    let chatSendData = chatData.slice(chatLength-chatLoadWindow, chatLength);
    res.send({
        chatLength: chatLength-chatLoadWindow,
        chatWindow: chatLoadWindow,
        chatData: chatSendData
    });
});


// return 20 messages prior to the specified limit
userController.get('/get-chat-thread-range/:previousLimit', async(req, res)=>{
    let lastLimit = parseInt(req.params["previousLimit"]);
    // console.log('GET: /get-chat-thread-range/' + lastLimit);
    let chatData = await Connection._db.collection('chat-data').find({}).toArray();
    chatData = chatData.slice(lastLimit-chatLoadWindow, lastLimit);
    res.send(chatData);
});

module.exports = userController;
