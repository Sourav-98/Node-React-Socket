
const registerController = require('express').Router();

const registerService = require('./../../services/auth/registerService');

registerController.get('/register', (req, res)=>{
    let data = registerService.defaultRegisterService();
    res.send(JSON.stringify(data));
});

module.exports = registerController;
