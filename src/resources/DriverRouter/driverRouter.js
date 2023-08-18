const { Router } = require("express");

const getDriversController = require("../../services/Driver/getDriversController.js");
const postDriverController = require("../../services/Driver/postDriverController.js");
const getDriverByIdController = require("../../services/Driver/getDriverByIdController.js");
const putDriverController = require("../../services/Driver/putDriverController.js");
const deleteDriverController = require("../../services/Driver/deleteDriverController.js");

const getDriversHandler = async (req, res) => {
    try {
        const drivers = await getDriversController();

        return res.status(200).json(drivers);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const postDriverHandler = async (req, res) => {
  const {
    car_id,
    name,
    last_name,
    dni,
    ruc,
    license_number,
    phone_number,
    email,
    address,
    bank_name,
    bank_account_type,
    bank_account,
    rating,
  } = req.body;
  try {
    const newDriver = await postDriverController(
      car_id,
      name,
      last_name,
      dni,
      ruc,
      license_number,
      phone_number,
      email,
      address,
      bank_name,
      bank_account_type,
      bank_account,
      rating,
      );
      return res.status(201).json({created: newDriver.created});
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getDriverByIdHandler = async (req, res) => {
    const { id } = req.params;
    try {
        if (!id) throw new Error("Missing data");
        const driver = await getDriverByIdController(id);
        return res.status(200).json(driver);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const putDriverHandler = async (req, res) => {
  const {
    id,
    car_id,
    name,
    last_name,
    dni,
    ruc,
    license_number,
    phone_number,
    email,
    address,
    bank_name,
    bank_account_type,
    bank_account,
    rating,
  } = req.body;
  try {
    if (!id)
    throw new Error("Missing data");
    const driverUpdate = await putDriverController(
      id,
      car_id,
      name,
      last_name,
      dni,
      ruc,
      license_number,
      phone_number,
      email,
      address,
      bank_name,
      bank_account_type,
      bank_account,
      rating,
    );
    return res.status(200).json({updated: driverUpdate.updated});
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteDriverHandler = async (req, res) => {
  const { id } = req.body;
  try {
    if (!id) throw new Error("Missing data");
    const deletedDriver = await deleteDriverController(id);
    return res.status(200).json(deletedDriver);
    } catch (error) {
      return res.status(400).json({ error: error.message });
  }
};

const { auth } = require('express-oauth2-jwt-bearer');
const jwtCheck = auth({
  audience: 'http://localhost:5000',
  issuerBaseURL: 'https://dev-4aecm50nap6pl2q5.us.auth0.com/',
  tokenSigningAlg: 'RS256'
});

const driverRouter = Router();

/* driverRouter.get("/", jwtCheck, getDriversHandler); */
driverRouter.get('/', getDriversHandler);
driverRouter.post('/', postDriverHandler);
driverRouter.get('/:id', getDriverByIdHandler);
driverRouter.put('/', putDriverHandler);
driverRouter.delete('/', deleteDriverHandler);

module.exports = driverRouter;