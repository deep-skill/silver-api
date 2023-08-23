const { Router } = require("express");
const ReserveService = require('../service/ReserveService');

const getAll = async (req, res) => {
  try {
    const reserves = await ReserveService.getAll();
    return res.status(200).json(reserves);
    } catch (error) {
      return res.status(400).json({ error: error.message });
  }
};

const get = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) throw new Error("Missing data");
    const reserve = await ReserveService.get(id);
    return res.status(200).json(reserve);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const create = async (req, res) => {
  const {
    userId,
    driverId,
    enterpriseId,
    silverCarId,
    tripType,
    serviceType,
    startTime,
    startAddress,
    endAddress,
    price,
    driverPercent,
    silverPercent
  } = req.body;
  try {
    await ReserveService.create(
      userId,
      driverId,
      enterpriseId,
      silverCarId,
      tripType,
      serviceType,
      startTime,
      startAddress,
      endAddress,
      price,
      driverPercent,
      silverPercent
      );
      return res.status(201).json();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const update = async (req, res) => {
  const {id} = req.params;
  const {
    userId,
    driverId,
    enterpriseId,
    silverCarId,
    tripType,
    serviceType,
    startTime,
    startAddress,
    endAddress,
    price,
    driverPercent,
    silverPercent
  } = req.body;
  try {
    if (!id) throw new Error("Missing data");
    const updatedReserve = await ReserveService.update(
      id,
      userId,
      driverId,
      enterpriseId,
      silverCarId,
      tripType,
      serviceType,
      startTime,
      startAddress,
      endAddress,
      price,
      driverPercent,
      silverPercent
    );
    return res.status(201).json(updatedReserve);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const erase = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) throw new Error("Missing data");
    await ReserveService.erase(id);
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

const ReserveRouter = Router();

/* driverRouter.get("/", jwtCheck, getDriversHandler); */
ReserveRouter.get('/', getAll);
ReserveRouter.post('/', create);
ReserveRouter.get('/:id', get);
ReserveRouter.patch('/:id', update);
ReserveRouter.delete('/:id', erase);

module.exports = ReserveRouter;