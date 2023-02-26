const express = require('express');
const morgan = require('morgan');
const fileUptoad = require('express-fileupload');
const cors = require('cors');

const app = express();

app.use(
    cors({
        origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    })
);

app.use(express.json());

app.use(express.static('static'));

app.use(morgan('dev'));

app.use(fileUptoad());

/**
 * ###################
 * ### Middlewares ###
 * ###################
 */

const isAuth = require('./middlewares/isAuth');

/**
 * #################################
 * ### CONTROLADORES DE USERS ###
 * #################################
 */

const getUser = require('./controllers/users/getUser');
const loginUser = require('./controllers/users/loginUser');
const editUser = require('./controllers/users/editUser');

/**
 * ##############################
 * ### CONTROLADORES DE WORKS ###
 * ##############################
 */

const deleteWork = require('./controllers/works/deleteWork');
const getWorks = require('./controllers/works/getWorks');
const newWorks = require('./controllers/works/newWorks');
const editWorks = require('./controllers/works/editWorks');

/**
 * #############################
 * ### ENDPOINTS DE USERS ###
 * #############################
 */

app.get('/user', isAuth, getUser);
app.post('/login', loginUser);
app.put('/users/edit', isAuth, editUser);

/**
 * ##########################
 * ### ENDPOINTS DE WORKS ###
 * ##########################
 */

app.delete('/works/delete/:idLink', isAuth, deleteWork);
app.get('/works', getWorks);
app.post('/works/new', isAuth, newWorks);
app.put('/works/:idLink', isAuth, editWorks);

//////////////////////

app.use((error, req, res, next) => {
    console.error(error);
    res.status(error.httpStatus || 500);
    res.send({
        status: 'Error',
        message: error.message,
    });
});

app.use((req, res) => {
    res.status(404);
    res.send({
        status: 'Error',
        message: 'Not found',
    });
});

app.listen(4000, () => {
    console.log('Server listening at http://localhost:4000');
});