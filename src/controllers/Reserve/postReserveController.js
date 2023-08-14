const { Reserve } = require("../../database");

const postReserveController = async (
  user_id,
  driver_id,
  enterprise_ruc,
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
      trip_type,
      start_time,
      start_address,
      end_address,
      price,
      driver_percent,
  });
  return newReserve;
};

module.exports = postReserveController;