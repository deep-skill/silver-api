const { Router } = require("express");

const getEnterpriseByRucController = require("../../../services/Enterprise/getEnterpriseByRucController.js");
const getEnterprisesController = require("../../../services/Enterprise/getEnterprisesController.js");
const postEnterpriseController = require("../../../services/Enterprise/postEnterpriseController.js");
const putEnterpriseController = require("../../../services/Enterprise/putEnterpriseController.js");
const deleteEnterpriseController = require("../../../services/Enterprise/deleteEnterpriseController.js");

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
    const newEnterprise = await postEnterpriseController(ruc, name, address);
    return res.status(201).json({created: newEnterprise.created});
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
    return res.status(200).json({deleted: deletedEnterprise.deleted});
    } catch (error) {
      return res.status(400).json({ error: error.message });
  }
};

const enterpriseRouter = Router();

enterpriseRouter.get('/', getEnterprisesHandler);
enterpriseRouter.post('/', postEnterpriseHandler);
enterpriseRouter.get("/:ruc", getEnterpriseByRucHandler);
enterpriseRouter.put('/', putEnterpriseHandler);
enterpriseRouter.delete('/', deleteEnterpriseHandler);

module.exports = enterpriseRouter;
