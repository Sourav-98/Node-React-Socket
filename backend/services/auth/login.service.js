// login service - provides authentication service for user login

const { Connection } = require('./../../util/dbConn');

const defaultMessage = {
    service: "Login Service", 
    message: "The service for providing authentication..."
}

exports.defaultLoginMessage = async function(){
    return defaultMessage;
}

exports.defaultUserLogin = async function(userCredentials){
    try{
        let loginUser = await Connection._db.collection('chat-users').findOne({username : userCredentials.username});
        console.log(loginUser);
    }
    catch(err){
        console.log(err);
    }
}
