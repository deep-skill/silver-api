const { Router } = require("express");

const {
  getTripsHandler,
  getTripByIdHandler,
  postTripHandler,
  putTripHandler,
  deleteTripHandler
} = require("../../handlers/Trip/tripHandler.js");

const tripRouter = Router();

tripRouter.get('/', getTripsHandler);
tripRouter.post('/', postTripHandler)
tripRouter.get('/:id', getTripByIdHandler)
tripRouter.put('/', putTripHandler)
tripRouter.delete('/', deleteTripHandler)

module.exports = tripRouter;