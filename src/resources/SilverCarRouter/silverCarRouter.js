const { Router } = require("express");

const getSilverCarsController = require("../../services/SilverCar/getSilverCarsController.js");
const postSilverCarController = require("../../services/SilverCar/postSilverCarController.js");
const getSilverCarByIdController = require("../../services/SilverCar/getSilverCarByIdController.js");
const putSilverCarController = require("../../services/SilverCar/putSilverCarController.js");
const deleteSilverCarController = require("../../services/SilverCar/deleteSilverCarController.js");

const getSilverCarsHandler = async (req, res) => {
  try {
    const silverCars = await getSilverCarsController();
    return res.status(200).json(silverCars);
    } catch (error) {
      return res.status(400).json({ error: error.message });
  }
};

const postSilverCarHandler = async (req, res) => {
  const {
    license_plate,
    brand,
    model,
    type,
    color,
    year
    } = req.body;
    try {
      const newSilverCar = await postSilverCarController(
        license_plate,
        brand,
        model,
        type,
        color,
        year
        );
      return res.status(201).json({created: newSilverCar.created});
      } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const getSilverCarByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) throw new Error("Missing data");
    const silverCar = await getSilverCarByIdController(id);
    return res.status(200).json(silverCar);
    } catch (error) {
      return res.status(400).json({ error: error.message });
  }
};

const putSilverCarHandler = async (req, res) => {
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
    const silverCarUpdate = await putSilverCarController(
      id,
      license_plate,
      brand,
      model,
      type,
      color,
      year
      );
    return res.status(200).json({updated: silverCarUpdate.updated});
    } catch (error) {
      return res.status(400).json({ error: error.message });
  }
};

const deleteSilverCarHandler = async (req, res) => {
  const { id } = req.body;
  try {
    if (!id) throw new Error("Missing data");
    const deletedSilverCar = await deleteSilverCarController(id);
    return res.status(200).json({deleted: deletedSilverCar.deleted});
    } catch (error) {
      return res.status(400).json({ error: error.message });
  }
};

const SilverCarRouter = Router();

/* ReserveRouters.get("/", jwtCheck, getReservesHandler); */
SilverCarRouter.get('/',  getSilverCarsHandler);
SilverCarRouter.post('/', postSilverCarHandler);
SilverCarRouter.get('/:id', getSilverCarByIdHandler);
SilverCarRouter.put('/', putSilverCarHandler);
SilverCarRouter.delete('/', deleteSilverCarHandler);

module.exports = SilverCarRouter;