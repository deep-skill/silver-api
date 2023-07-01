const { Router } = require('express');

const postEnterprise = require('../../controllers/Enterprise/postEnterprise.js')
const getEnterprise = require('../../controllers/Enterprise/getEnterprise.js')
const putEnterprise = require('../../controllers/Enterprise/putEnterprise.js')
const statusEnterprise = require('../../controllers/Enterprise/statusEnterprise.js')

const etrepiseRouters = Router();

etrepiseRouters.post('/create', postEnterprise)
etrepiseRouters.get('/get', getEnterprise)
etrepiseRouters.put('/update', putEnterprise)
etrepiseRouters.put('/status', statusEnterprise)

module.exports = etrepiseRouters;