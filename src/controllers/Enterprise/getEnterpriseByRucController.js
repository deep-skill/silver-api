const { Enterprise } = require("../../database");

const getEnterpriseByRucController = async (ruc) => {
    const enterprise = Enterprise.findOne({ where: { ruc } });
    return enterprise;
};

module.exports = getEnterpriseByRucController;
