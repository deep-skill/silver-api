const { Router } = require("express");
const DriverAccountService = require('../service/DriverAccountService');

const getAll = async (req, res) => {
  try {
    const driverAccounts = await DriverAccountService.getAll();
    return res.status(200).json(driverAccounts);
    } catch (error) {
      return res.status(400).json({ error: error.message });
  }
};

const get = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) throw new Error("Missing data");
    const driverAccount = await DriverAccountService.get(id);
    return res.status(200).json(driverAccount);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const create = async (req, res) => {
  const {
    bankName,
    bankAccountType,
    bankAccount,
    cci,
  } = req.body;
  try {
    const driverAccount = await DriverAccountService.create(
      bankName,
      bankAccountType,
      bankAccount,
      cci,
      );
      return res.status(201).json(driverAccount);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const update = async (req, res) => {
  const {id} = req.params;
  const {
    bankName,
    bankAccountType,
    bankAccount,
    cci,
  } = req.body;
  try {
    if (!id) throw new Error("Missing data");
    const updatedDriverAccount = await DriverAccountService.update(
      id,
      bankName,
      bankAccountType,
      bankAccount,
      cci,
    );
    return res.status(200).json(updatedDriverAccount);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const erase = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) throw new Error("Missing data");
    await DriverAccountService.erase(id);
    return res.status(204).json();
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

const DriverAccountRouter = Router();

/* driverRouter.get("/", jwtCheck, getDriversHandler); */
DriverAccountRouter.get('/', getAll);
DriverAccountRouter.post('/', create);
DriverAccountRouter.get('/:id', get);
DriverAccountRouter.patch('/:id', update);
DriverAccountRouter.delete('/:id', erase);

module.exports = DriverAccountRouter;