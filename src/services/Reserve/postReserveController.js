const { Reserve } = require("../../database");

const postReserveController = async (
  user_id,
  driver_id,
  enterprise_ruc,
  silver_car_id,
  trip_type,
  start_time,
  start_address,
  end_address,
  price,
  driver_percent,
  ) => {
    const newReserve = await Reserve.create({
      user_id,
      driver_id,
      enterprise_ruc,
      silver_car_id,
      trip_type,
      start_time,
      start_address,
      end_address,
      price,
      driver_percent,
  });
  return {
    created: true,
  };
};

module.exports = postReserveController;