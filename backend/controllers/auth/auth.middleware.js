
const { Connection } = require('./../../util/dbConn');

const registerService = require('./../../services/admin/admin.service');

exports.userExistsMiddleware = async function(req, res, next){
    let userData = req.body;
    try{
        let loginUser = await Connection._db.collection('chat-users').findOne({ emailId : userData.email });
        if (!loginUser){
            res.send({      // if the user is not found, the response is sent to break the flow
                'error' : 'User Not Found - 404'
            });
        }
        else{
            req.loginUser = loginUser;   // store the user info fetched from the db in the req to be processed by the password verifier middleware
            next();
        }
    }
    catch(err){
        console.log(err);
        res.send(JSON.stringify({
            'error' : 'Server error! - 500'
        }));
    }
}

exports.userPasswordVerifierMiddleware = async function(req, res, next){
    let userData = req.body;
    console.log(userData);
    if(req.loginUser.password !== userData.password){
        res.send({              // if user password doesn't match, the response is sent to break the flow
            'error' : 'Incorrect password'
        });
    }
    else{
        next();
    }

}
