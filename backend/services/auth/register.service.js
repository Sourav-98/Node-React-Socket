
const { ChatUser } = require('../../modelsDTO/ChatUserDTO');
const { Connection } = require('../../util/dbConn');

let defaultMessage = {
    service: "Register Service", 
    message: "The service responsible for creating new users"
}

exports.defaultRegisterService = async function(){
    return defaultMessage;
}

exports.newUserRegistration = async function(userData){
    let user = new ChatUser(userData.fname, userData.lname, userData.email, userData.passwd);
    try{
        let result = await Connection._db.collection('chat-users').insertOne(user);
        return result;
    }
    catch(err){
        switch(err.code){
            case 11000: throw { // mongodb error 11000 - entry with the same primary key already exists
                err_code: err.code, 
                err_message: "Error - User with an email id: " + userData.email + " already exists!"
            };
            default: throw err;
        }
    }
}
