const { Reserve } = require("../../database");

const deleteReserveController = async (id) => {
  const reserve = await Reserve.findOne({ where: { id } });
  await reserve.destroy();
  return {
    deleted: true,
    reserve,
  };
};

module.exports = deleteReserveController;