const { Router } = require("express");
const { requiredScopes } = require('express-oauth2-jwt-bearer');
const jwtCheck = require('../../jwtCheck');
const StopService = require("../service/StopService");
const errorHandler = require("../../utils/errorHandler");

const getAll = async (req, res) => {
  try {
    const stops = await StopService.getAll();
    return res.status(200).json(stops);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

const get = async (req, res) => {
  const { id } = req.params;
  try {
    if (!+id) throw new Error("Id must be an integer");
    const stop = await StopService.get(id);
    if (!stop) throw new Error(`Stop with id ${id} does not exist`);
    return res.status(200).json(stop);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

const create = async (req, res) => {
  const { tripId, location, lat, lon } = req.body;
  try {
    const stop = await StopService.create(tripId, location, lat, lon);
    return res.status(201).json(stop);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { tripId, location, lat, lon, arrived } = req.body;
  try {
    if (!id) throw new Error("Missing data");
    const updatedStop = await StopService.update(
      id,
      tripId,
      location,
      lat,
      lon,
      arrived
    );
    return res.status(200).json(updatedStop);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

const erase = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) throw new Error("Missing data");
    const deletedStop = await StopService.erase(id);
    return res.status(204).json(deletedStop);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

const StopRouter = Router();

StopRouter.get("/", jwtCheck, requiredScopes('admin'), getAll);
StopRouter.get("/:id", jwtCheck, requiredScopes('admin'), get);
StopRouter.post("/", jwtCheck, requiredScopes('admin'), create);
StopRouter.put("/:id", jwtCheck, requiredScopes('admin'), update);
StopRouter.put("/driver/:id", jwtCheck, requiredScopes('driver'), update);
StopRouter.delete("/:id", jwtCheck, requiredScopes('admin'), erase);
StopRouter.post("/driver", jwtCheck, requiredScopes('driver'), create);
StopRouter.delete("/driver/:id", jwtCheck, requiredScopes('driver'), erase);


module.exports = StopRouter;
