
const loginController = require('express').Router();

const loginService = require('./../../services/auth/loginService');

loginController.get('/login', async (req, res)=>{
    let data = await loginService.defaultLoginService();
    res.send(JSON.stringify(data));
})

// loginController.post('/login', (req, res)=>{

// });


module.exports = loginController;
