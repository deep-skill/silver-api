const { Enterprise } = require("../../database");

const deleteEnterpriseController = async (ruc) => {
  const enterprise = await Enterprise.findOne({ where: { ruc } });
  await enterprise.destroy();
  return {
    deleted: true,
    enterprise,
  };
};

module.exports = deleteEnterpriseController;
