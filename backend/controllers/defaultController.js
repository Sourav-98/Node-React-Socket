const defaultController = require('express').Router();

const defaultService = require('./../services/defaultService');

defaultController.get('/', (req, res)=>{
    res.send(JSON.stringify(defaultService.defaultHomeService()));
});

defaultController.get('/get-rooms', (req, res)=>{
    res.send(JSON.stringify(defaultService.getUserRooms()));
})

defaultController.use('*', (req, res)=>{
    res.send(JSON.stringify(defaultService.error404Service()));
})

module.exports = defaultController;
