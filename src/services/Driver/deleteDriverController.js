const { Driver } = require("../../database");

const deleteDriverController = async (id) => {
  const driver = await Driver.findOne({ where: { id } });
  await driver.destroy();
  return {
    deleted: true,
    driver,
  };
};

module.exports = deleteDriverController;
