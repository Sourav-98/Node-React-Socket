
class ChatUserDTO{
    
    constructor(firstName = undefined, lastName = undefined, emailId = undefined, password = undefined, lastLogin = undefined, isVerified = false, rolesList = undefined){
        this.firstName = firstName;
        this.lastName = lastName;
        this.emailId = emailId;
        this.password = password;
        this.lastLogin = lastLogin;
        this.isVerified = isVerified;
        this.rolesList = rolesList;
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

    setLastLogin(lastLogin){
        this.lastLogin = lastLogin;
    }

    setIsVerified(isVerified){
        this.isVerified = isVerified;
    }

    setRolesList(rolesList){
        this.rolesList = rolesList;
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

    getLastLogin(){
        return this.lastLogin;
    }

    getIsVerified(){
        return this.isVerified;
    }

    getRolesList(){
        return this.rolesList;
    }
}

module.exports = { ChatUserDTO };
