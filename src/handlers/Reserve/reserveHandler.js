const getReservesController = require("../../controllers/Reserve/getReservesController.js");
const postReserveController = require("../../controllers/Reserve/postReserveController.js");
const getReserveByIdController = require("../../controllers/Reserve/getReserveByIdController.js");
const putReserveController = require("../../controllers/Reserve/putReserveController.js");
const deleteReserveController = require("../../controllers/Reserve/deleteReserveController.js");

const getReservesHandler = async (req, res) => {
  try {
    const reserves = await getReservesController();
    return res.status(200).json(reserves);
    } catch (error) {
      return res.status(400).json({ error: error.message });
  }
};

const postReserveHandler = async (req, res) => {
  const {
    user_id,
    driver_id,
    enterprise_ruc,
    trip_type,
    start_time,
    start_address,
    end_address,
    price,
    driver_percent,
    } = req.body;
    try {
      const newReserve = await postReserveController(
        user_id,
        driver_id,
        enterprise_ruc,
        trip_type,
        start_time,
        start_address,
        end_address,
        price,
        driver_percent,
        );
      return res.status(200).json(newReserve);
      } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const getReserveByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) throw new Error("Missing data");
    const reserve = await getReserveByIdController(id);
    return res.status(200).json(reserve);
    } catch (error) {
      return res.status(400).json({ error: error.message });
  }
};

const putReserveHandler = async (req, res) => {
  const {
    id,
    user_id,
    driver_id,
    enterprise_ruc,
    trip_type,
    start_time,
    start_address,
    end_address,
    price,
    driver_percent
  } = req.body;
  try {
    if (!id) throw new Error("Missing data");
    const reserveUpdate = await putReserveController(
      id,
      user_id,
      driver_id,
      enterprise_ruc,
      trip_type,
      start_time,
      start_address,
      end_address,
      price,
      driver_percent
      );
    return res.status(200).json(reserveUpdate);
    } catch (error) {
      return res.status(400).json({ error: error.message });
  }
};

const deleteReserveHandler = async (req, res) => {
  const { id } = req.body;
  try {
    if (!id) throw new Error("Missing data");
    const deletedReserve = await deleteReserveController(id);
    return res.status(200).json(deletedReserve);
    } catch (error) {
      return res.status(400).json({ error: error.message });
  }
};
    
module.exports = {
    getReservesHandler,
    postReserveHandler,
    getReserveByIdHandler,
    putReserveHandler,
    deleteReserveHandler,
};
