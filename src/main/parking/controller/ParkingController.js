const { Router } = require("express");
const { requiredScopes } = require('express-oauth2-jwt-bearer');
const jwtCheck = require('../../jwtCheck');
const ParkingService = require("../service/ParkingService");
const errorHandler = require("../../utils/errorHandler");

const getAll = async (req, res) => {
  try {
    const parkings = await ParkingService.getAll();
    return res.status(200).json(parkings);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

const get = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) throw new Error("Missing data");
    const parking = await ParkingService.get(id);
    return res.status(200).json(parking);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

const create = async (req, res) => {
  const { tripId, amount, name } = req.body;
  try {
    const parking = await ParkingService.create(tripId, amount, name);
    return res.status(201).json(parking);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const {  amount, name ,tripId} = req.body;
  try {
    if (!id) throw new Error("Missing data");
    const updatedParking = await ParkingService.update(
      id,
      amount,
      name,
      tripId
    );
    return res.status(200).json(updatedParking);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

const erase = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) throw new Error("Missing data");
    await ParkingService.erase(id);
    return res.status(204).json();
  } catch (error) {
    errorHandler(error, req, res);
  }
};

const ParkingRouter = Router();

ParkingRouter.get("/", jwtCheck, requiredScopes('admin'), getAll);
ParkingRouter.post("/", jwtCheck, requiredScopes('admin'), create);
ParkingRouter.get("/:id", jwtCheck, requiredScopes('admin'), get);
ParkingRouter.put("/:id", jwtCheck, requiredScopes('admin'), update);
ParkingRouter.delete("/:id", jwtCheck, requiredScopes('admin'), erase);
ParkingRouter.post("/driver", jwtCheck, requiredScopes('driver'), create);
ParkingRouter.delete("/driver/:id", jwtCheck, requiredScopes('driver'), erase);


module.exports = ParkingRouter;
