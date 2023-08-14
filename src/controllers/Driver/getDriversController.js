const { Driver } = require("../../database");

const getDriversController = async () => {
  const drivers = await Driver.findAll();
  return drivers;
};

module.exports = getDriversController;
