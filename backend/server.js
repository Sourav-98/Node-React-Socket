
const express = require('express');
// const bodyParser = require('body-parser');
const cors = require('cors');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');

const app = express();

const loginController = require('./controllers/auth/login.controller');
const registerController = require('./controllers/auth/register.controller');
const defaultController = require('./controllers/default.controller');
const adminController = require('./controllers/admin/admin.controller');

const userController = require('./controllers/user/user.controller');

app.use(cors({
    origin: 'https://localhost:3000',
    credentials: true
}));

app.use(cookieParser());
// app.use(csrf({
//     cookie: true
// }));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(loginController);
app.use(registerController);
app.use('/admin', adminController);
app.use('/user', userController);

app.use(defaultController);

module.exports = app;
