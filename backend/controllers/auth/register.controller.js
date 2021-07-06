
const registerController = require('express').Router();


const registerService = require('../../services/auth/register.service');

registerController.get('/register', async (req, res)=>{
    let data = await registerService.defaultRegisterService();
    res.send(JSON.stringify(data));
});

registerController.post('/register', async (req, res)=>{
    let userData = req.body;
    try{
        let result = await registerService.newUserRegistration(userData);
        res.send(result);
    }
    catch(err){
        res.send(err);
    }
});

registerController.post('/register-dummy', async(req, res)=>{
    let userData = req.body;
    console.log(userData);
    res.send({"message" : "Data received!"});
})

module.exports = registerController;
