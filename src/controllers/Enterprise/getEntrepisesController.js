const { Enterprise } = require("../../database");

const getEnterprisesController = async (ruc) => {
    const enterprises = Enterprise.findAll()

    return enterprises;
};

module.exports = getEnterprisesController;
