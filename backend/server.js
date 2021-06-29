
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const loginController = require('./controllers/auth/login.controller');
const registerController = require('./controllers/auth/register.controller');
const defaultController = require('./controllers/default.controller');
const adminController = require('./controllers/admin/admin.controller');

app.use(bodyParser.urlencoded({extended: true}));
app.use(loginController);
app.use(registerController);
app.use('/admin', adminController);

app.use(defaultController);

module.exports = app;
