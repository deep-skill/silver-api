const { Router } = require("express");
const { requiredScopes } = require('express-oauth2-jwt-bearer');
const jwtCheck = require('../../jwtCheck');
const DriverService = require('../service/DriverService');
const DriverAccountController = require('./DriverAccountController');
const errorHandler = require("../../utils/errorHandler");

const getAll = async (req, res) => {
  try {
    const drivers = await DriverService.getAll();
    return res.status(200).json(drivers);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

const get = async (req, res) => {
  const { id } = req.params;
  try {
    if (!+id) throw new Error("Id must be an integer");
    const driver = await DriverService.get(id);
    if (!driver) throw new Error(`Driver with id ${id} does not exist`);
    return res.status(200).json(driver);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

const create = async (req, res) => {
  const {
    carId,
    driverAccountId,
    name,
    lastName,
    dni,
    ruc,
    licenseNumber,
    phoneNumber,
    email,
    address,
    imageUrl
  } = req.body;
  try {
    const driver = await DriverService.create(
      carId,
      driverAccountId,
      name,
      lastName,
      dni,
      ruc,
      licenseNumber,
      phoneNumber,
      email,
      address,
      imageUrl
    );
    return res.status(201).json(driver);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const {
    carId,
    driverAccountId,
    name,
    lastName,
    dni,
    ruc,
    licenseNumber,
    phoneNumber,
    email,
    address,
    imageUrl
  } = req.body;
  try {
    if (!id) throw new Error("Missing data");
    const updatedDriver = await DriverService.update(
      id,
      carId,
      driverAccountId,
      name,
      lastName,
      dni,
      ruc,
      licenseNumber,
      phoneNumber,
      email,
      address,
      imageUrl
    );
    return res.status(200).json(updatedDriver);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

const erase = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) throw new Error("Missing data");
    await DriverService.erase(id);
    return res.status(204).json();
  } catch (error) {
    errorHandler(error, req, res);
  }
};

const getDriverByName = async (req, res) => {
  const { query } = req.query;
  try {
    const drivers = await DriverService.getDriverByName(query);
    return res.status(200).json(drivers);
  } catch (error) {
    errorHandler(error, req, res);
  }
};
const getDriverByEmail = async (req, res) => {
  const { query } = req.query;
  try {
    if (!query) throw new Error("Missing data");
    const driver = await DriverService.getDriverByEmail(query);
    return res.status(200).json(driver);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

const DriverRouter = Router();

DriverRouter.use('/bank-accounts', DriverAccountController);
DriverRouter.get('/', jwtCheck, requiredScopes('admin'), getAll);
DriverRouter.post('/', jwtCheck, requiredScopes('admin'), create);
DriverRouter.get('/drivers', jwtCheck, requiredScopes('admin'), getDriverByName);
DriverRouter.get('/driver', jwtCheck, requiredScopes('driver'), getDriverByEmail);
DriverRouter.get('/:id', jwtCheck, requiredScopes('admin'), get);
DriverRouter.patch('/:id', jwtCheck, requiredScopes('admin'), update);
DriverRouter.delete('/:id', jwtCheck, requiredScopes('admin'), erase);

module.exports = DriverRouter;