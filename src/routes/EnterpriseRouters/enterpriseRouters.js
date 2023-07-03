const { Router } = require("express");

const {
    getEnterpriceHandler,
    getEnterpriseHandler,
    postEnterpriseHandler,
    putEnterpriseHandler,
    statusEnterpriseHandler
} = require("../../handlers/Enterprise/enterprisesHandler");

const enterpriseRouters = Router();

enterpriseRouters.get("/", getEnterpriceHandler)
enterpriseRouters.get("/get", getEnterpriseHandler);
enterpriseRouters.post('/create', postEnterpriseHandler)
enterpriseRouters.put('/update', putEnterpriseHandler)
enterpriseRouters.put('/status', statusEnterpriseHandler)

module.exports = enterpriseRouters;
