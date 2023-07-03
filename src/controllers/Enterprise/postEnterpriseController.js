const { Enterprise } = require("../../database");

const postEnterpriseController = async (ruc, name, address) => {
    await Enterprise.create({
        ruc,
        name,
        address,
    });

    return {
        created: true,
        name,
    };
};

module.exports = postEnterpriseController;
