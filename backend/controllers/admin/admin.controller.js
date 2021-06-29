
const adminController = require('express').Router();
const adminService = require('./../../services/admin/admin.service');

adminController.get('/get-users-list', async(req, res)=>{
    // await adminService.dummySleepPromise(2000);
    // await adminService.dummySleepAsync(4000);
    // adminService.getChatUsers()
    // .then(usersList =>{
    //     res.send(usersList);
    // })
    // .catch(err =>{
    //     res.send(err);
    // })

    let data = await adminService.getChatUsers1();
    res.send(data);
});

// or

adminController.get('/get-users-list-alt', async(req, res)=>{
    try{
        let data = await adminService.getChatUsersAlt();
        res.send(data);
    }
    catch(err){
        res.send(err);
    }
});

module.exports = adminController;
