const { SilverCar } = require("../../database");

const getSilverCarsController = async () => {
  const silverCars = SilverCar.findAll();
  return silverCars;
};

module.exports = getSilverCarsController;
