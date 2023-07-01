const { Trip } = require("../../database");

const putTripController = async (
  id,
  type,
  total,
  start,
  end,
  state,
  driverRating,
  userRating
) => {
  let trip = await Trip.findByPk(id);

  trip.type = type !== undefined ? type : trip.type;
  trip.total = total !== undefined ? total : trip.total;
  trip.start = start !== undefined ? start : trip.start;
  trip.end = end !== undefined ? end : trip.end;
  trip.state = state !== undefined ? state : trip.state;
  trip.driverRating = driverRating !== undefined ? driverRating : trip.driverRating;
  trip.userRating = userRating !== undefined ? userRating : trip.userRating;

  await trip.save();

  return trip;
};

module.exports = putTripController;
