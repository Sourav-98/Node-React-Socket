
const loginController = require('express').Router();

const { read } = require('mongodb/lib/gridfs/grid_store');
const loginService = require('../../services/auth/login.service');
const authMiddleware = require('./auth.middleware');

loginController.get('/login', async(req, res)=>{
    let data = loginService.defaultLoginMessage();
    res.send(JSON.stringify(data));
});

loginController.post('/login-default', async(req, res)=>{
    let postData = req.body;
    let userCredentials = postData;    //userCredentials = {username/email, password}
    await loginService.defaultUserLogin({username : userCredentials.username, password : userCredentials.password});
    res.send({message : 'Reached end of request'});
})

// loginController.post('/login', (req, res)=>{

// });

// Passport JS login for Google
loginController.post('/login-google', (req, res)=>{

});

loginController.post('/login-dummy', authMiddleware.userExistsMiddleware, authMiddleware.userPasswordVerifierMiddleware, async (req, res)=>{
    res.send({  // flow reaches here after a successfull pass in the 2 middlewares
        'message' : 'User Authentication Successful'
    });
});

loginController.get('/csrf', (req, res)=>{
    res.send({csrfToken: req.csrfToken()});
})



module.exports = loginController;
