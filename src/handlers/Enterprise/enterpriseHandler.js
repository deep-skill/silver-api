const getEnterpriseByRucController = require("../../controllers/Enterprise/getEnterpriseByRucController.js");
const getEnterprisesController = require("../../controllers/Enterprise/getEnterprisesController.js");
const postEnterpriseController = require("../../controllers/Enterprise/postEnterpriseController.js");
const putEnterpriseController = require("../../controllers/Enterprise/putEnterpriseController.js");
const deleteEnterpriseController = require("../../controllers/Enterprise/deleteEnterpriseController.js");

const getEnterprisesHandler = async (req, res) => {
    try {
        const enterprises = await getEnterprisesController();
        res.status(200).json(enterprises);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const getEnterpriseByRucHandler = async (req, res) => {
    const { ruc } = req.params;

    try {
        if (!ruc) throw new Error("Missing data");

        const enterprise = await getEnterpriseByRucController(ruc);

        return res.status(200).json(enterprise);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const postEnterpriseHandler = async (req, res) => {
    const { ruc, name, address } = req.body;
    try {
        if (!ruc || !name || !address) throw new Error("Missing data");

        const enterprise = await postEnterpriseController(ruc, name, address);

        return res.status(201).json(enterprise);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const putEnterpriseHandler = async (req, res) => {
    const { ruc, newRuc, name, address } = req.body;
    try {
        const enterpriseUpdate = await putEnterpriseController(
            ruc,
            newRuc,
            name,
            address
        );
        return res.status(200).json(enterpriseUpdate);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const deleteEnterpriseHandler = async (req, res) => {
    const { ruc } = req.body;

    try {
        if (!ruc) throw new Error("Missing data");

        const deletedEnterprise = await deleteEnterpriseController(ruc);

        return res.status(200).json(deletedEnterprise);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

module.exports = {
    getEnterprisesHandler,
    getEnterpriseByRucHandler,
    postEnterpriseHandler,
    putEnterpriseHandler,
    deleteEnterpriseHandler,
};
