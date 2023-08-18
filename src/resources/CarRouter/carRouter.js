const { Router } = require("express");

const getCarsController = require("../../services/Car/getCarsController.js");
const postCarController = require("../../services/Car/postCarController.js");
const getCarByIdController = require("../../services/Car/getCarByIdController.js");
const putCarController = require("../../services/Car/putCarController.js");
const deleteCarController = require("../../services/Car/deleteCarController.js");

const getCarsHandler = async (req, res) => {
  try {
    const cars = await getCarsController();
    return res.status(200).json(cars);
    } catch (error) {
      return res.status(400).json({ error: error.message });
  }
};

const postCarHandler = async (req, res) => {
  const {
    license_plate,
    brand,
    model,
    type,
    color,
    year
    } = req.body;
    try {
      const newCar = await postCarController(
        license_plate,
        brand,
        model,
        type,
        color,
        year
        );
      return res.status(201).json({created: newCar.created});
      } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const getCarByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) throw new Error("Missing data");
    const car = await getCarByIdController(id);
    return res.status(200).json(car);
    } catch (error) {
      return res.status(400).json({ error: error.message });
  }
};

const putCarHandler = async (req, res) => {
  const {
    id,
    license_plate,
    brand,
    model,
    type,
    color,
    year
  } = req.body;
  try {
    if (!id) throw new Error("Missing data");
    const carUpdate = await putCarController(
      id,
      license_plate,
      brand,
      model,
      type,
      color,
      year
      );
    return res.status(200).json({updated: carUpdate.updated});
    } catch (error) {
      return res.status(400).json({ error: error.message });
  }
};

const deleteCarHandler = async (req, res) => {
  const { id } = req.body;
  try {
    if (!id) throw new Error("Missing data");
    const deletedCar = await deleteCarController(id);
    return res.status(200).json({deleted: deletedCar.deleted});
    } catch (error) {
      return res.status(400).json({ error: error.message });
  }
};

const CarRouter = Router();

/* ReserveRouters.get("/", jwtCheck, getReservesHandler); */
CarRouter.get('/',  getCarsHandler);
CarRouter.post('/', postCarHandler);
CarRouter.get('/:id', getCarByIdHandler);
CarRouter.put('/', putCarHandler);
CarRouter.delete('/', deleteCarHandler);

module.exports = CarRouter;