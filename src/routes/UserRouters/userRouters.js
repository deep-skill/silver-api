const { Router } = require('express');

const putUserData = require('../../controllers/User/putUserData.js');
const getUserData = require('../../controllers/User/getUserData.js');
const statusUserData = require('../../controllers/User/statusUserData.js');

const userRouters = Router();

userRouters.put('/update', putUserData);
userRouters.put('/status', statusUserData);
userRouters.get('/get', getUserData);

module.exports = userRouters;