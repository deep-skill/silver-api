const { Enterprise } = require("../../database");

const getEnterprisesController = async () => {
  const enterprises = Enterprise.findAll();
  return enterprises;
};

module.exports = getEnterprisesController;
