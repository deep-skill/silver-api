const { SilverCar } = require("../../database");

const putSilverCarController = async (
  id,
  license_plate,
  brand,
  model,
  type,
  color,
  year
) => {
  const silverCar = await SilverCar.findOne({ where: { id } });

  license_plate ? (silverCar.license_plate = license_plate) : null;
  brand ? (silverCar.brand = brand) : null;
  model ? (silverCar.model = model) : null;
  type ? (silverCar.type = type) : null;
  color ? (silverCar.color = color) : null;
  year ? (silverCar.year = year) : null;

  await silverCar.save();

  return {
    updated: true,
  };
};

module.exports = putSilverCarController;
