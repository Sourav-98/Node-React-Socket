
const userController = require('express').Router();

const { Connection } = require('./../../util/dbConn');


userController.get('/get-chat-thread-first', async(req, res)=>{
    let chatData = await Connection._db.collection('chat-data').find({}).toArray();
    let chatLength = chatData.length;
    // console.log(chatLength);
    // send a fixed chat length
    let chatSendData = chatData.slice(chatLength-20, chatLength);
    res.send({
        chatLength: chatLength-20,
        chatData: chatSendData
    });
});


// return 20 messages prior to the specified limit
userController.get('/get-chat-thread-range/:previousLimit', async(req, res)=>{
    let lastLimit = parseInt(req.params["previousLimit"]);
    console.log('GET: /get-chat-thread-range/' + lastLimit);
    let chatData = await Connection._db.collection('chat-data').find({}).toArray();
    chatData = chatData.slice(lastLimit-20, lastLimit);
    res.send(chatData);
});




module.exports = userController;

