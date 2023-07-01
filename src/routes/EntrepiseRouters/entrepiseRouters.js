const { Router } = require("express");

const {
    getEntrepisesHandler,
    getEntrepiseHandler,
    postEntrepiseHandler,
    putEntrepiseHandler,
    statusEntrepiseHandler
} = require("../../handlers/Entrepise/entrepisesHandler");

const entrepiseRouters = Router();

entrepiseRouters.get("/get", getEntrepiseHandler);
entrepiseRouters.get("/", getEntrepisesHandler)
entrepiseRouters.post('/create', postEntrepiseHandler)
entrepiseRouters.put('/update', putEntrepiseHandler)
entrepiseRouters.put('/status', statusEntrepiseHandler)

module.exports = entrepiseRouters;
