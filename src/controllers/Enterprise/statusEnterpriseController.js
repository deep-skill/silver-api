const { Enterprise } = require("../../database");

const statusEnterpriseController = async (ruc, status) => {
    const enterprise = await Enterprise.findOne({ where: { ruc } });

    enterprise.status = status;

    await enterprise.save();

    return {
        updated: true,
        ruc,
        status,
    };
};

module.exports = statusEnterpriseController;
