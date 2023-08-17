const { SilverCar } = require("../../database");

const getSilverCarByIdController = async (id) => {
  const silverCar = SilverCar.findOne({ where: { id } });
  return silverCar;
};

module.exports = getSilverCarByIdController;
