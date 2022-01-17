// login service - provides authentication service for user login

const { Connection } = require('./../../util/dbConn');
const { ChatUserDAO } = require('./../../repositoryDAO/ChatUserDAO');

const defaultMessage = {
    service: "Login Service", 
    message: "The service for providing authentication..."
}

exports.defaultLoginMessage = async function(){
    return defaultMessage;
}

exports.defaultUserLogin = async function(userCredentials){
    try{
        let loginUser = await ChatUserDAO.findUserById(userCredentials.emailId);
        console.log(loginUser);
        if(loginUser.getPassword() != userCredentials.password){
            return false;
        }
        return loginUser;
    }
    catch(err){
        console.log(err);
    }
}

exports.emailVerification = async function(userEmailId){
    try{
        // Perform email verification hashcode check
        return await ChatUserDAO.updateUserIsVerifiedByEmailId(userEmailId);
    }
    catch(err){
        console.log(err);
    }
}
