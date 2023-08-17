const { Reserve } = require("../../database");

const putReserveController = async (
  id,
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
    const reserve = await Reserve.findOne({ where: { id } });
    user_id ? (reserve.user_id = ruc) : null;
    driver_id ? (reserve.driver_id = driver_id) : null;
    enterprise_ruc ? (reserve.enterprise_ruc = enterprise_ruc) : null;
    trip_type ? (reserve.trip_type = trip_type) : null;
    start_time ? (reserve.start_time = start_time) : null;
    start_address ? (reserve.start_address = start_address) : null;
    end_address ? (reserve.end_address = end_address) : null;
    price ? (reserve.price = price) : null;
    driver_percent ? (reserve.driver_percent = driver_percent) : null;
  await reserve.save();

  return {
    updated: true,
    reserve,
  };
};

module.exports = putReserveController;