const getDriversController = require("../../controllers/Driver/getDriversController.js");
const postDriverController = require("../../controllers/Driver/postDriverController.js");
const getDriverByIdController = require("../../controllers/Driver/getDriverByIdController.js");
const putDriverController = require("../../controllers/Driver/putDriverController.js");
const deleteDriverController = require("../../controllers/Driver/deleteDriverController.js");

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
    car_brand,
    car_model,
    car_year,
    rating,
  } = req.body;
  try {
    const newDriver = await postDriverController(
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
      car_brand,
      car_model,
      car_year,
      rating,
      );
      return res.status(200).json(newDriver);
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
    car_brand,
    car_model,
    car_year,
    rating,
  } = req.body;
  try {
    if (!id)
    throw new Error("Missing data");
    const driverUpdate = await putDriverController(
      id,
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
      car_brand,
      car_model,
      car_year,
      rating,
    );
    return res.status(200).json(driverUpdate);
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
    
module.exports = {
    getDriversHandler,
    postDriverHandler,
    getDriverByIdHandler,
    putDriverHandler,
    deleteDriverHandler,
};
