const { Enterprise } = require("../../database");

const getEnterpriseController = async (ruc) => {
    const enterprise = Enterprise.findOne({ where: { ruc } });

    return enterprise;
};

module.exports = getEnterpriseController;
