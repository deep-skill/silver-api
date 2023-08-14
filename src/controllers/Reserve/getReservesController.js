const { Reserve } = require("../../database");

const getReservesController = async () => {
  const reserves = await Reserve.findAll()
  return reserves;
};

module.exports = getReservesController;
