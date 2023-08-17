const { Car } = require("../../database");

const postCarController = async (
  license_plate,
  brand,
  model,
  type,
  color,
  year
  ) => {
  const newCar = await Car.create({
    license_plate,
    brand,
    model,
    type,
    color,
    year
  });
  return {
    created: true,
  };
};

module.exports = postCarController;
