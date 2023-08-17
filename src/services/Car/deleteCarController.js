const { Car } = require("../../database");

const deleteCarController = async (id) => {
  const car = await Car.findOne({ where: { id } });
  await car.destroy();
  return {
    deleted: true,
  };
};

module.exports = deleteCarController;
