const { Trip } = require("../../database");

const deleteTripController = async (id) => {
  const trip = await Trip.findOne({ where: { id: id } });
  await trip.destroy();
  return {
    deleted: true,
    trip,
  };
};

module.exports = deleteTripController;
