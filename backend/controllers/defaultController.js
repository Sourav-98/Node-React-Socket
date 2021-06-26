const defaultController = require('express').Router();

const { Connection } = require('./../util/db1');

const defaultService = require('./../services/defaultService');

defaultController.get('/', async (req, res)=>{
    // console.log(db);
    let defaultData = await defaultService.defaultHomeService();
    res.send(JSON.stringify(defaultData));
});

defaultController.get('/api-students', async (req, res)=>{
    let data = await defaultService.apiGetStudents();
    res.send(JSON.stringify(data));
})

defaultController.get('/get-rooms', async(req, res)=>{
    let data = await defaultService.getUserRooms();
    res.send(JSON.stringify(data));
})

defaultController.use('*', async(req, res)=>{
    let errorData = await defaultService.error404Service();
    res.send(JSON.stringify(errorData));
})

module.exports = defaultController;
