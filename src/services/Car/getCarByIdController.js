const { Car } = require("../../database");

const getCarByIdController = async (id) => {
  const car = Car.findOne({ where: { id } });
  return car;
};

module.exports = getCarByIdController;
