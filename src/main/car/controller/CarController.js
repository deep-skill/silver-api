const {Router} = require("express");
const CarService = require("../service/CarService");

const getAll = async (req, res) => {
  try {
    const cars = await CarService.getAll();
    return res.status(200).json(cars);
    } catch (error) {
      return res.status(400).json({error: error.message});
  }
};

const get = async (req, res) => {
  const {id} = req.params;
  try {
    if (!id) throw new Error("Missing data");
    const car = await CarService.get(id);
    return res.status(200).json(car);
  } catch (error) {
    return res.status(400).json({error: error.message});
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
        return res.status(400).json({error: error.message});
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
      return res.status(400).json({error: error.message});
  }
};

const erase = async (req, res) => {
  const {id} = req.params;
  try {
    if (!id) throw new Error("Missing data");
    await CarService.erase(id);
    return res.status(204).json();
  } catch (error) {
      return res.status(400).json({error: error.message});
  }
};

const getCarByLicensePlate = async (req, res) => {
  const { query } = req.query;
    try {
    if (!query) throw new Error("Missing data");
    const cars = await CarService.getCarByLicensePlate(query);
    return res.status(200).json(cars);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  } 
};

const CarRouter = Router();

/* ReserveRouters.get("/", jwtCheck, getReservesHandler); */
CarRouter.get('/',  getAll);
CarRouter.post('/', create);
CarRouter.get('/cars', getCarByLicensePlate);
CarRouter.get('/:id', get);
CarRouter.put('/:id', update);
CarRouter.delete('/:id', erase);

module.exports = CarRouter;