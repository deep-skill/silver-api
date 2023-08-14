const { Enterprise } = require("../../database");

const postEnterpriseController = async (ruc, name, address) => {
  const newEnterprise = await Enterprise.create({
    ruc,
    name,
    address,
  });
  return {
    created: true,
    newEnterprise,
  };
};

module.exports = postEnterpriseController;
