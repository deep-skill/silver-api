const { Trip } = require("../../database");

const postTripController = async (
  reserve_id,
  total_price,
  on_way_driver,
  arrived_driver,
  start_time,
  end_time,
  status,
  driver_rating,
  passenger_rating
  ) => {
    const trip = await Trip.create({
      reserve_id,
      total_price,
      on_way_driver,
      arrived_driver,
      start_time,
      end_time,
      status,
      driver_rating,
      passenger_rating
    });
    return {
      created: true,
      trip,
  };
};

module.exports = postTripController;
