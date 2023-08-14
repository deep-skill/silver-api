const { Reserve } = require("../../database");

const getReserveByIdController = async (id) => {
  const reserve = Reserve.findOne({ where: { id } });
  return reserve;
};

module.exports = getReserveByIdController;
