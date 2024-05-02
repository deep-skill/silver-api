const { Router } = require("express");
const { requiredScopes } = require('express-oauth2-jwt-bearer');
const jwtCheck = require('../../jwtCheck');
const CarService = require("../service/CarService");
const errorHandler = require("../../utils/errorHandler");

const getAll = async (req, res) => {
  try {
    const cars = await CarService.getAll();
    return res.status(200).json(cars);
    } catch (error) {
      errorHandler(error, req, res);
  }
};

const get = async (req, res) => {
  const {id} = req.params;
  try {
    if (!id) throw new Error("Missing data");
    const car = await CarService.get(id);
    return res.status(200).json(car);
    } catch (error) {
      errorHandler(error, req, res);
  }
};

const create = async (req, res) => {
  const {
    licensePlate,
    owner,
    brand,
    model,
    type,
    color,
    year
    } = req.body;
    try {
      const car = await CarService.create(
          licensePlate,
          owner,
          brand,
          model,
          type,
          color,
          year
      );
      return res.status(201).json(car);
    } catch (error) {
      errorHandler(error, req, res);
    }
};

const update = async (req, res) => {
  const {id} = req.params;
  const {
    licensePlate,
    owner,
    brand,
    model,
    type,
    color,
    year
  } = req.body;
  try {
    if (!id) throw new Error("Missing data");
    const updatedCar = await CarService.update(
        id,
        licensePlate,
        owner,
        brand,
        model,
        type,
        color,
        year
    );
    return res.status(200).json(updatedCar);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

const erase = async (req, res) => {
  const {id} = req.params;
  try {
    if (!id) throw new Error("Missing data");
    await CarService.erase(id);
    return res.status(204).json();
  } catch (error) {
    errorHandler(error, req, res);
  }
};

const getCarByLicensePlate = async (req, res) => {
  const { query } = req.query;
    try {
    if (!query) throw new Error("Missing data");
    const cars = await CarService.getCarByLicensePlate(query);
    return res.status(200).json(cars);
  } catch (error) {
    errorHandler(error, req, res);
  } 
};

const CarRouter = Router();

CarRouter.get('/', jwtCheck, requiredScopes('admin'), getAll);
CarRouter.post('/', jwtCheck, requiredScopes('admin'), create);
CarRouter.get('/cars', jwtCheck, requiredScopes('admin'), getCarByLicensePlate);
CarRouter.get('/:id', jwtCheck, requiredScopes('admin'), get);
CarRouter.put('/:id', jwtCheck, requiredScopes('admin'), update);
CarRouter.delete('/:id', jwtCheck, requiredScopes('admin'), erase);

module.exports = CarRouter;