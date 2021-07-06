

class ChatUser{
    
    constructor(firstName, lastName, emailId, password, rolesList){
        this.firstName = firstName;
        this.lastName = lastName;
        this.emailId = emailId;
        this.password = password;
        this.isVerified = false;
        this.roles = rolesList;
    }

    setFirstName(firstName){
        this.firstName = firstName;
    }

    setLastName(lastName){
        this.lastName = lastName;
    }

    setEmailId(emailId){
        this.emailId = emailId;
    }

    setPassword(password){
        this.password = password;
    }

    setIsVerified(isVerified){
        this.isVerified = isVerified;
    }

    getFirstName(){
        return this.firstName;
    }

    getLastName(){
        return this.lastName;
    }

    getEmailId(){
        return this.emailId;
    }

    getPassword(){
        return this.password;
    }

    getIsVerified(){
        return this.isVerified;
    }
}

module.exports = { ChatUser };

