const { SilverCar } = require("../../database");

const deleteSilverCarController = async (id) => {
  const silverCar = await SilverCar.findOne({ where: { id } });
  await silverCar.destroy();
  return {
    deleted: true,
  };
};

module.exports = deleteSilverCarController;
