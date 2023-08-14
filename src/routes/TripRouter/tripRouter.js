const { Router } = require("express");

const {
    getTripsHandler,
    getTripHandler,
    postTripHandler,
    putTripHandler,
    statusTripHandler
} = require("../../handlers/Trip/tripHandler.js");

const tripRouter = Router();

tripRouter.get('/:id', getTripHandler)
tripRouter.get("/", getTripsHandler);
tripRouter.post('/create', postTripHandler)
tripRouter.put('/update', putTripHandler)
tripRouter.put('/status', statusTripHandler)

module.exports = tripRouter;
