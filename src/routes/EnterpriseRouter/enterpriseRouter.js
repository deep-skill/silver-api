const { Router } = require("express");

const {
  getEnterprisesHandler,
  getEnterpriseByRucHandler,
  postEnterpriseHandler,
  putEnterpriseHandler,
  deleteEnterpriseHandler,
} = require("../../handlers/Enterprise/enterpriseHandler.js");

const enterpriseRouter = Router();

enterpriseRouter.get('/', getEnterprisesHandler);
enterpriseRouter.post('/', postEnterpriseHandler);
enterpriseRouter.get("/:ruc", getEnterpriseByRucHandler);
enterpriseRouter.put('/', putEnterpriseHandler);
enterpriseRouter.delete('/', deleteEnterpriseHandler);

module.exports = enterpriseRouter;
