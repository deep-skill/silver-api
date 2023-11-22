const { Router } = require("express");
const TripService = require("../service/TripService");

const getAll = async (req, res) => {
  try {
    const trips = await TripService.getAll();
    return res.status(200).json(trips);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const get = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) throw new Error("Missing data");
    const trip = await TripService.get(id);
    return res.status(200).json(trip);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const create = async (req, res) => {
  const {
    reserveId,
    totalPrice,
    onWayDriver,
    arrivedDriver,
    startTime,
    endTime,
    status,
  } = req.body;
  try {
    const trip = await TripService.create(
      reserveId,
      totalPrice,
      onWayDriver,
      arrivedDriver,
      startTime,
      endTime,
      status
    );
    return res.status(201).json(trip);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const {
    totalPrice,
    onWayDriver,
    arrivedDriver,
    startTime,
    endTime,
    status,
    driverRating,
    passengerRating,
  } = req.body;
  try {
    if (!id) throw new Error("Missing data");
    const updatedTrip = await TripService.update(
      id,
      totalPrice,
      onWayDriver,
      arrivedDriver,
      startTime,
      endTime,
      status,
      driverRating,
      passengerRating
    );
    return res.status(200).json(updatedTrip);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const erase = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) throw new Error("Missing data");
    await TripService.erase(id);
    return res.status(204).json();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getTripsHistory = async (req, res) => {
  const { page } = req.query;
  try {
    const trips = await TripService.getTripsHistory(page);
    return res.status(200).json(trips);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getTripsByQuery = async (req, res) => {
  let { query } = req.query;

  try {
    if (!query) throw new Error("Missing data");
    const trips = await TripService.getTripByQuery(query);
    return res.status(200).json(trips);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
};

const getTripsSummary = async (req, res) => {
  try {
    const trips = await TripService.getTripsSummary();
    return res.status(200).json(trips);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
const getDriverMonthSummary = async (req, res) => {
  const { id } = req.query;
  if (!id) throw new Error("Missing data");
  try {
    const trips = await TripService.getDriverMonthSummary(id);
    return res.status(200).json(trips);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getAllTripsDriver = async (req, res) => {
  const {id} = req.params
  const {  page } = req.query;
  console.log(id, page)
  if (!id) throw new Error("Missing data");
  try {
    const trips = await TripService.getAllTripsDriver(id, page);
    return res.status(200).json(trips);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const { auth } = require("express-oauth2-jwt-bearer");

const jwtCheck = auth({
  audience: "http://localhost:5000",
  issuerBaseURL: "https://dev-4aecm50nap6pl2q5.us.auth0.com/",
  tokenSigningAlg: "RS256",
});

const TripRouter = Router();

/* driverRouter.get("/", jwtCheck, getDriversHandler); */
TripRouter.get("/", getAll);
TripRouter.post("/", create);
TripRouter.get("/admin-summary", getTripsSummary);
TripRouter.get("/admin-history", getTripsHistory);
TripRouter.get("/trip-search", getTripsByQuery);
TripRouter.get("/driver-summary", getDriverMonthSummary);
TripRouter.get("/:id", get);
TripRouter.patch("/:id", update);
TripRouter.delete("/:id", erase);
TripRouter.get("/driver-trip/:id", get);
TripRouter.get("/driver-trip-all/:id", getAllTripsDriver );
TripRouter.patch("/driver-trip/:id", update);
TripRouter.delete("/driver-trip/:id", erase);

module.exports = TripRouter;
