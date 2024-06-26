const { Router } = require("express");
const { requiredScopes } = require('express-oauth2-jwt-bearer');
const jwtCheck = require('../../jwtCheck');
const SilverCarService = require('../service/SilverCarService');
const errorHandler = require("../../utils/errorHandler");

const getAll = async (req, res) => {
  try {
    const silverCars = await SilverCarService.getAll();
    return res.status(200).json(silverCars);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

const get = async (req, res) => {
  const { id } = req.params;
  try {
    if (!+id) throw new Error("Id must be an integer");
    const silverCar = await SilverCarService.get(id);
    if (!silverCar) throw new Error(`silverCar with id ${id} does not exist`);
    return res.status(200).json(silverCar);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

const create = async (req, res) => {
  const {
    licensePlate,
    brand,
    model,
    type,
    color,
    year
  } = req.body;
  try {
    await SilverCarService.create(
      licensePlate,
      brand,
      model,
      type,
      color,
      year
    );
    return res.status(201).json();
  } catch (error) {
    errorHandler(error, req, res);
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const {
    licensePlate,
    brand,
    model,
    type,
    color,
    year
  } = req.body;
  try {
    if (!id) throw new Error("Missing data");
    const updatedSilverCar = await SilverCarService.update(
      id,
      licensePlate,
      brand,
      model,
      type,
      color,
      year
    );
    return res.status(201).json(updatedSilverCar);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

const erase = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) throw new Error("Missing data");
    await SilverCarService.erase(id);
    return res.status(204).json();
  } catch (error) {
    errorHandler(error, req, res);
  }
};

const SilverCarRouter = Router();

SilverCarRouter.get('/', jwtCheck, requiredScopes('admin'), getAll);
SilverCarRouter.post('/', jwtCheck, requiredScopes('admin'), create);
SilverCarRouter.get('/:id', jwtCheck, requiredScopes('admin'), get);
SilverCarRouter.patch('/:id', jwtCheck, requiredScopes('admin'), update);
SilverCarRouter.delete('/:id', jwtCheck, requiredScopes('admin'), erase);

module.exports = SilverCarRouter;