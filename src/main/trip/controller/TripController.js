const { Router } = require("express");
const { requiredScopes } = require('express-oauth2-jwt-bearer');
const jwtCheck = require('../../jwtCheck');
const TripService = require("../service/TripService");
const errorHandler = require("../../utils/errorHandler");

const getAll = async (req, res) => {
  try {
    const trips = await TripService.getAll();
    return res.status(200).json(trips);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

const get = async (req, res) => {
  const { id } = req.params;
  try {
    if (!+id) throw new Error("Missing data");
    const trip = await TripService.get(id);
    if (trip === null) throw new Error(`Trip with id ${id} does not exist`);
    return res.status(200).json(trip);
  } catch (error) {
    errorHandler(error, req, res);
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
      status,
    );
    return res.status(201).json(trip);
  } catch (error) {
    errorHandler(error, req, res);
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
    waitingTimeExtra,
    suggestedTotalPrice,
    tripPolyline,
    tripDistanceMeters
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
      passengerRating,
      waitingTimeExtra,
      suggestedTotalPrice,
      tripPolyline,
      tripDistanceMeters
    );
    return res.status(200).json(updatedTrip);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

const updateTotalPrice = async (req, res) => {
  const { id } = req.params;

  const {
    totalPrice,
  } = req.body;
  try {
    if (!id) throw new Error("Missing data");
    const updatedTrip = await TripService.updateTotalPrice(
      +id,
      totalPrice,
    );
    return res.status(200).json(updatedTrip);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

const erase = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) throw new Error("Missing data");
    await TripService.erase(id);
    return res.status(204).json();
  } catch (error) {
    errorHandler(error, req, res);
  }
};

const getTripsHistory = async (req, res) => {
  const { page } = req.query;
  try {
    const trips = await TripService.getTripsHistory(page);
    return res.status(200).json(trips);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

const getTripsByQuery = async (req, res) => {
  let { query } = req.query;

  try {
    if (!query) throw new Error("Missing data");
    const trips = await TripService.getTripByQuery(query);
    return res.status(200).json(trips);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

const getTripsSummary = async (req, res) => {
  try {
    const trips = await TripService.getTripsSummary();
    return res.status(200).json(trips);
  } catch (error) {
    errorHandler(error, req, res);
  }
};
const getDriverMonthSummary = async (req, res) => {
  const { id } = req.query;
  if (!id) throw new Error("Missing data");
  try {
    const trips = await TripService.getDriverMonthSummary(id);
    return res.status(200).json(trips);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

const getAllDriverTrips = async (req, res) => {
  const { id } = req.params;
  const { page } = req.query;

  if (!id) throw new Error("Missing data");
  try {
    const trips = await TripService.getAllDriverTrips(id, page);
    return res.status(200).json(trips);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

const getDriverTripByQuery = async (req, res) => {

  const { id } = req.params;
  const { query } = req.query;

  try {
    const reserves = await TripService.getDriverTripByQuery(id, query);
    return res.status(200).json(reserves);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

const getAdminTripById = async (req, res) => {
  const { id } = req.params;
  try {
    if (!+id) throw new Error("Missing data");
    const trip = await TripService.getAdminTripById(id);
    if (trip === null) throw new Error(`Trip with id ${id} does not exist`);
    return res.status(200).json(trip);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

const TripRouter = Router();

TripRouter.get("/", jwtCheck, requiredScopes('driver'), getAll);
TripRouter.post("/", jwtCheck, requiredScopes('driver'), create);
TripRouter.get("/admin-summary", getTripsSummary);
TripRouter.get("/admin-history", jwtCheck, requiredScopes('admin'), getTripsHistory);
TripRouter.get("/admin-trip/:id", jwtCheck, requiredScopes('admin'), getAdminTripById);
TripRouter.get("/trip-search", jwtCheck, requiredScopes('admin'), getTripsByQuery);
TripRouter.get("/driver-trips/:id", jwtCheck, requiredScopes('driver'), getAllDriverTrips);
TripRouter.get("/driver-summary", jwtCheck, requiredScopes('driver'), getDriverMonthSummary);
TripRouter.get("/:id", jwtCheck, requiredScopes('driver'), get);
TripRouter.patch("/admin-trip-total-price/:id", jwtCheck, requiredScopes('admin'), updateTotalPrice);
TripRouter.patch("/:id", jwtCheck, requiredScopes('driver'), update);
TripRouter.delete("/:id", jwtCheck, requiredScopes('driver'), erase);
TripRouter.get("/driver-trip/:id", jwtCheck, requiredScopes('driver'), get);
TripRouter.patch("/driver-trip/:id", jwtCheck, requiredScopes('driver'), update);
TripRouter.delete("/driver-trip/:id", jwtCheck, requiredScopes('driver'), erase);
TripRouter.get("/driver-search/:id", jwtCheck, requiredScopes('driver'), getDriverTripByQuery);

module.exports = TripRouter;
