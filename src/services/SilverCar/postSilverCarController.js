const { SilverCar } = require("../../database");

const postSilverCarController = async (
  license_plate,
  brand,
  model,
  type,
  color,
  year
  ) => {
  const newSilverCar = await SilverCar.create({
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

module.exports = postSilverCarController;
