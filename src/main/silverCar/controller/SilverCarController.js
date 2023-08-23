const { Router } = require("express");
const SilverCarService = require('../service/SilverCarService');

const getAll = async (req, res) => {
  try {
    const silverCars = await SilverCarService.getAll();
    return res.status(200).json(silverCars);
    } catch (error) {
      return res.status(400).json({ error: error.message });
  }
};

const get = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) throw new Error("Missing data");
    const silverCar = await SilverCarService.get(id);
    return res.status(200).json(silverCar);
  } catch (error) {
    return res.status(400).json({ error: error.message });
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
    return res.status(400).json({ error: error.message });
  }
};

const update = async (req, res) => {
  const {id} = req.params;
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
    return res.status(400).json({ error: error.message });
  }
};

const erase = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) throw new Error("Missing data");
    await SilverCarService.erase(id);
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

const SilverCarRouter = Router();

/* driverRouter.get("/", jwtCheck, getDriversHandler); */
SilverCarRouter.get('/', getAll);
SilverCarRouter.post('/', create);
SilverCarRouter.get('/:id', get);
SilverCarRouter.patch('/:id', update);
SilverCarRouter.delete('/:id', erase);

module.exports = SilverCarRouter;