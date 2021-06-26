
const registerController = require('express').Router();

const registerService = require('./../../services/auth/registerService');

registerController.get('/register', async (req, res)=>{
    let data = await registerService.defaultRegisterService();
    res.send(JSON.stringify(data));
});

module.exports = registerController;
