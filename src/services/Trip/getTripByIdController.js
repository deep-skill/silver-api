const { Trip } = require("../../database");

const getTripByIdController = async (id) => {
  const trip = Trip.findOne({ where: { id } });
  return trip;
};

module.exports = getTripByIdController;
