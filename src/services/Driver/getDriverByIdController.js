const { Driver } = require("../../database");

const getDriverByIdController = async (id) => {
  const driver = Driver.findOne({ where: { id } });
  
  return driver;
};

module.exports = getDriverByIdController;
