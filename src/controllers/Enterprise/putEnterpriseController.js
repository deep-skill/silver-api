const { Enterprise } = require("../../database");

const putEnterpriseController = async (ruc, newRuc, name, address) => {
  const enterprise = await Enterprise.findOne({ where: { ruc } });

  newRuc ? (enterprise.ruc = newRuc) : null;
  name ? (enterprise.name = name) : null;
  address ? (enterprise.address = address) : null;

  await enterprise.save();

  return {
    updated: true,
    enterprise,
  };
};

module.exports = putEnterpriseController;
