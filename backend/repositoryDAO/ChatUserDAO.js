
const { ChatUserDTO } = require('./../modelsDTO/ChatUserDTO');
const { Connection } = require('./../util/dbConn');

class ChatUserDAO{
    
    // MongoDB Collection Name for ChatUserDAO
    collectionName = 'chat-users';

    async findUserById(userEmailId){
        try{
            let chatUser = await Connection.getDb().collection(this.collectionName).find({emailId : userEmailId});
            // let chatUserDTO = new ChatUserDTO(chatUser.fname, chatUser.lname, chatUser.emailId, chatUser.password, chatUser.lastLogin, chatUser.isVerified, chatUser.roles);
            let chatUserDTO = new ChatUserDTO();
            chatUserDTO.setFirstName(chatUser.firstName);
            chatUserDTO.setLastName(chatUser.lastName);
            chatUserDTO.setEmailId(chatUser.emailId);
            chatUserDTO.setPassword(chatUser.password);
            chatUserDTO.setLastLogin(chatUser.lastLogin);
            chatUserDTO.setIsVerified(chatUser.isVerified);
            chatUserDTO.setRolesList(chatUser.rolesList);
            return chatUserDTO;
        }
        catch(err){
            console.log("Error at findUserById() -> " + err);
            throw err;
        }
    }

    async addNewUser(chatUserData){
        try{
            let chatUserDTO = new ChatUserDTO();
            chatUserDTO.setFirstName(chatUserData.firstName);
            chatUserDTO.setLastName(chatUserData.lastName);
            chatUserDTO.setEmailId(chatUserData.emailId);
            chatUserDTO.setPassword(chatUserData.password);
            chatUserDTO.setLastLogin(chatUserData.lastLogin);
            chatUserDTO.setIsVerified(chatUserData.isVerified);
            chatUserDTO.setRolesList(chatUserData.rolesList);
            await Connection.getDb().collection(this.collectionName).insertOne(chatUserDTO);
        }
        catch(err){
            console.log("Error at addNewUser() -> " + err);
            throw err;
        }
    }

    async deleteUserAccount(userEmailId){
        try{
            await Connection.getDb().collection('chat-users').delete({emailId : userEmailId});
        }
        catch(err){
            console.log("Error at deleteUserAccount() -> " + err);
        }
    }
    
}

module.exports = { ChatUserDAO };
