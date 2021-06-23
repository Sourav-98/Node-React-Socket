
const express = require('express');
const app = express();

const loginController = require('./controllers/auth/loginController');
const registerController = require('./controllers/defaultController');
const defaultController = require('./controllers/defaultController');

app.use(loginController);
app.use(registerController);



app.use(defaultController);

module.exports = app;
