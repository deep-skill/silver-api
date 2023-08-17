const { Car } = require("../../database");

const getCarsController = async () => {
  const cars = Car.findAll();
  return cars;
};

module.exports = getCarsController;
