const { Router } = require("express");
const {requiredScopes} = require('express-oauth2-jwt-bearer');
const jwtCheck = require('../../jwtCheck');
const TollService = require("../service/TollService");
const errorHandler = require("../../utils/errorHandler");

const getAll = async (req, res) => {
  try {
    const tolls = await TollService.getAll();
    return res.status(200).json(tolls);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

const get = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) throw new Error("Missing data");
    const toll = await TollService.get(id);
    return res.status(200).json(toll);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

const create = async (req, res) => {
  const { tripId, name, amount, lat, lon } = req.body;
  try {
    const toll = await TollService.create(tripId, name, amount, lat, lon);
    return res.status(201).json(toll);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const {tripId, name, amount, lat, lon} = req.body;
  try {
    if (!id) throw new Error("Missing data");
    const updatedtoll = await TollService.update(
      id,
      tripId,
      name,
      amount,
      lat,
      lon,
    );
    return res.status(200).json(updatedtoll);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

const erase = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) throw new Error("Missing data");
    const deletedtoll = await TollService.erase(id);
    return res.status(204).json(deletedtoll);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

const tollRouter = Router();

tollRouter.get("/", jwtCheck, requiredScopes('admin'), getAll);
tollRouter.get("/:id", jwtCheck, requiredScopes('admin'),  get);
tollRouter.post("/", jwtCheck, requiredScopes('admin'), create);
tollRouter.put("/:id", jwtCheck, requiredScopes('admin'),  update);
tollRouter.delete("/:id", jwtCheck, requiredScopes('admin'), erase);
tollRouter.post("/driver", jwtCheck, requiredScopes('driver'), create);
tollRouter.delete("/driver/:id", jwtCheck, requiredScopes('driver'), erase);


module.exports = tollRouter;