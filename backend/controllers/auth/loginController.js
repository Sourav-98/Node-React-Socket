
const loginController = require('express').Router();

const loginService = require('./../../services/auth/loginService');

loginController.get('/login', (req, res)=>{
    let data = loginService.defaultLoginService();
    res.send(JSON.stringify(data));
})

// loginController.post('/login', (req, res)=>{

// });


module.exports = loginController;
