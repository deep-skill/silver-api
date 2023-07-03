const { Router } = require("express");

const {
    getEnterprisesHandler,
    getEnterpriseHandler,
    postEnterpriseHandler,
    putEnterpriseHandler,
    statusEnterpriseHandler
} = require("../../handlers/Enterprise/enterpriseHandler.js");

const enterpriseRouters = Router();

enterpriseRouters.get("/", getEnterprisesHandler)
enterpriseRouters.get("/get", getEnterpriseHandler);
enterpriseRouters.post('/create', postEnterpriseHandler)
enterpriseRouters.put('/update', putEnterpriseHandler)
enterpriseRouters.put('/status', statusEnterpriseHandler)

module.exports = enterpriseRouters;
