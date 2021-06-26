// login service - provides authentication service for user login

const defaultMessage = {
    service: "Login Service", 
    message: "The service for providing authentication..."
}

exports.defaultLoginService = async function(){
    return defaultMessage;
}
