const { Router } = require('express');

const postTrip = require('../../controllers/Trip/postTrip.js')
const getTrip = require('../../controllers/Trip/getTrip.js')
const putTrip = require('../../controllers/Trip/putTrip.js')
const statusTrip = require('../../controllers/Trip/statusTrip.js')

const tripRouters = Router();

tripRouters.post('/create', postTrip)
tripRouters.get('/get', getTrip)
tripRouters.put('/update', putTrip)
tripRouters.put('/status', statusTrip)

module.exports = tripRouters;