const { Router } = require("express");

const {
    getTripsHandler,
    getTripHandler,
    postTripHandler,
    putTripHandler,
    statusTripHandler
} = require("../../handlers/Trips/tripsHandler.js");

const tripRouters = Router();

tripRouters.get('/:id', getTripHandler)
tripRouters.get("/", getTripsHandler);
tripRouters.post('/create', postTripHandler)
tripRouters.put('/update', putTripHandler)
tripRouters.put('/status', statusTripHandler)

module.exports = tripRouters;
