const { Trip } = require("../../database");

const getTripsController = async () => {
  const trips = await Trip.findAll();
  return trips;
};

module.exports = getTripsController;
