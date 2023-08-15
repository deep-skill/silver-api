const getTripsController = require("../../controllers/Trip/getTripsController.js");
const getTripByIdController = require("../../controllers/Trip/getTripByIdController.js");
const postTripController = require("../../controllers/Trip/postTripController.js");
const putTripController = require("../../controllers/Trip/putTripController.js");
const deleteTripController = require("../../controllers/Trip/deleteTripController.js");

const getTripsHandler = async (req, res) => {
  try {
    const trips = await getTripsController();
    return res.status(200).json(trips);
    } catch (error) {
      return res.status(400).json({ error: error.message });
  }
};

const getTripByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) throw new Error("Missing data");
    const trip = await getTripByIdController(id);
    return res.status(200).json(trip);
    } catch (error) {
      return res.status(400).json({ error: error.message });
  }
};

const postTripHandler = async (req, res) => {
  const {
    reserve_id,
    total_price,
    on_way_driver,
    arrived_driver,
    start_time,
    end_time,
    status,
    driver_rating,
    passenger_rating
  } = req.body;
  try {
    if (
      !reserve_id ||
      !on_way_driver
      ) throw res.status(400).json({ error: "Missing data" });
    const newTrip = await postTripController(
      reserve_id,
      total_price,
      on_way_driver,
      arrived_driver,
      start_time,
      end_time,
      status,
      driver_rating,
      passenger_rating
    );
    return res.status(201).json(newTrip);
    } catch (error) {
      return res.status(400).json({ error: error.message });
  }
};

const putTripHandler = async (req, res) => {
  const {
    id,
    reserve_id,
    total_price,
    on_way_driver,
    arrived_driver,
    start_time,
    end_time,
    status,
    driver_rating,
    passenger_rating
    } =req.body;
  try {
    if (!id) throw new Error("Missing data");
    const tripUpdate = await putTripController(
      id,
      reserve_id,
      total_price,
      on_way_driver,
      arrived_driver,
      start_time,
      end_time,
      status,
      driver_rating,
      passenger_rating
    );
    return res.status(200).json(tripUpdate);
    } catch (error) {
      return res.status(400).json({ error: error.message });
  }
};

const deleteTripHandler = async (req, res) => {
  const { id } = req.body;
  try {
    if (!id) throw new Error("Missing data");
    const deletedTrip = await deleteTripController(id);
    return res.status(200).json(deletedTrip);
    } catch (error) {
      return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getTripsHandler,
  postTripHandler,
  getTripByIdHandler,
  putTripHandler,
  deleteTripHandler
};