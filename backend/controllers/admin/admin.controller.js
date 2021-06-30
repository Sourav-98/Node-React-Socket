
const adminController = require('express').Router();
const adminService = require('./../../services/admin/admin.service');

adminController.get('/get-users-list', async(req, res)=>{
    let data = await adminService.getChatUsers();
    res.send(data);
});

// or

adminController.get('/get-users-list-alt', async(req, res)=>{
    try{
        let data = await adminService.getChatUsersAlt();
        console.log('---controller---')
        console.log(data);
        // await adminService.dummySleepPromise(5000);
        res.send(data);
    }
    catch(err){
        res.send(err);
    }
});

module.exports = adminController;
