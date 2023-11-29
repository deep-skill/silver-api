const { Router } = require("express");
const {requiredScopes} = require('express-oauth2-jwt-bearer');
const jwtCheck = require('../../jwtCheck');
const DriverService = require('../service/DriverService');
const DriverAccountController = require('./DriverAccountController');

const getAll = async (req, res) => {
  try {
    const drivers = await DriverService.getAll();
    return res.status(200).json(drivers);
    } catch (error) {
      return res.status(400).json({ error: error.message });
  }
};

const get = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) throw new Error("Missing data");
    const driver = await DriverService.get(id);
    return res.status(200).json(driver);
  } catch (error) {
    return res.status(400).json({ error: error.message });
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
      );
      return res.status(201).json(driver);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const update = async (req, res) => {
  const {id} = req.params;
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
    );
    return res.status(200).json(updatedDriver);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const erase = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) throw new Error("Missing data");
    await DriverService.erase(id);
    return res.status(204).json();
    } catch (error) {
      return res.status(400).json({ error: error.message });
  }
};

const getDriverByName = async (req, res) => {
  const { query } = req.query;
    try {
    if (!query) throw new Error("Missing data");
    const drivers = await DriverService.getDriverByName(query);
    return res.status(200).json(drivers);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  } 
};
const getDriverByEmail = async (req, res) => {
  const { query } = req.query;
    try {
    if (!query) throw new Error("Missing data");
    const driver = await DriverService.getDriverByEmail(query);
    return res.status(200).json(driver);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  } 
};

const DriverRouter = Router();

DriverRouter.use('/bank-accounts', DriverAccountController);
DriverRouter.get('/', getAll);
DriverRouter.post('/', create);
DriverRouter.get('/drivers', getDriverByName);
DriverRouter.get('/driver', jwtCheck, requiredScopes('driver'), getDriverByEmail);
DriverRouter.get('/:id', get);
DriverRouter.patch('/:id', update);
DriverRouter.delete('/:id', erase);

module.exports = DriverRouter;