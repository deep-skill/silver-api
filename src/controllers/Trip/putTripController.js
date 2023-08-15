const { Trip } = require("../../database");

const putTripController = async (
  id,
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
    const trip = await Trip.findByPk(id);
    reserve_id ? (trip.reserve_id = reserve_id) : null;
    total_price ? (trip.total_price = total_price) : null;
    on_way_driver ? (trip.on_way_driver = on_way_driver) : null;
    arrived_driver ? (trip.arrived_driver = arrived_driver) : null;
    start_time ? (trip.start_time = start_time) : null;
    end_time ? (trip.end_time = end_time) : null;
    status ? (trip.status = status) : null;
    driver_rating ? (trip.driver_rating = driver_rating) : null;
    passenger_rating ? (trip.passenger_rating = passenger_rating) : null;
    await trip.save();
    return {
      update: true,
      trip
    };
};

module.exports = putTripController;
