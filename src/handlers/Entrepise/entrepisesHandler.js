const getEnterpriseController = require("../../controllers/Enterprise/getEnterpriseController.js");
const getEnterprisesController = require("../../controllers/Enterprise/getEntrepisesController.js");
const postEnterpriseController = require("../../controllers/Enterprise/postEnterpriseController.js");
const putEnterpriseController = require("../../controllers/Enterprise/putEnterpriseController.js");
const statusEnterpriseController = require("../../controllers/Enterprise/statusEnterpriseController.js");

const getEntrepisesHandler = async (req, res) => {
    try {
        const entrepises = await getEnterprisesController();

        res.status(200).json(entrepises);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const getEntrepiseHandler = async (req, res) => {
    const { ruc } = req.body;

    try {
        if (!ruc) throw new Error("Missing data");

        const entrepise = await getEnterpriseController(ruc);

        return res.status(200).json(entrepise);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const postEntrepiseHandler = async (req, res) => {
    const { ruc, name, address } = req.body;

    try {
        if (!ruc || !name || !address) throw new Error("Missing data");

        const entrepise = await postEnterpriseController(ruc, name, address);

        return res.status(201).json(entrepise);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const putEntrepiseHandler = async (req, res) => {
    const { ruc, newRuc, name, address } = req.body;

    try {
        const entrepiseUpdate = await putEnterpriseController(
            ruc,
            newRuc,
            name,
            address
        );

        return res.status(200).json(entrepiseUpdate);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const statusEntrepiseHandler = async (req, res) => {
    const { ruc, status } = req.body;

    try {
        if (!status) throw new Error("Missing data");

        const newStatus = await statusEnterpriseController(ruc, status)

        return res.status(200).json(newStatus)
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

module.exports = {
    getEntrepisesHandler,
    getEntrepiseHandler,
    postEntrepiseHandler,
    putEntrepiseHandler,
    statusEntrepiseHandler,
};
