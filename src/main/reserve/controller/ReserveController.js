const { Router } = require("express");
const { requiredScopes } = require('express-oauth2-jwt-bearer');
const jwtCheck = require('../../jwtCheck');
const ReserveService = require("../service/ReserveService");
const errorHandler = require("../../utils/errorHandler");

const getAll = async (req, res) => {
  const { page, size } = req.query;
  if (page) {
    try {
      const reserves = await ReserveService.getPaginated(page, size);
      return res.status(200).json(reserves);
    } catch (error) {
      errorHandler(error, req, res);
    }
  } else {
    try {
      const reserves = await ReserveService.getAll();
      return res.status(200).json(reserves);
    } catch (error) {
      errorHandler(error, req, res);
    }
  }
};

const get = async (req, res) => {
  const { id } = req.params;
  try {
    if (!+id) throw new Error("Id must be an integer");
    const reserve = await ReserveService.get(id);
    if (!reserve) throw new Error(`Reserve with id ${id} does not exist`);
    return res.status(200).json(reserve);
  } catch (error) {
    errorHandler(error, req, res);
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
    serviceCarType,
    startTime,
    startAddress,
    startAddressLat,
    startAddressLon,
    endAddress,
    endAddressLat,
    endAddressLon,
    price,
    suggestedPrice,
    driverPercent,
    silverPercent,
    carId,
    reservePolyline
  } = req.body;
  try {
    const reserve = await ReserveService.create(
      userId,
      driverId,
      enterpriseId,
      silverCarId,
      tripType,
      serviceType,
      serviceCarType,
      startTime,
      startAddress,
      startAddressLat,
      startAddressLon,
      endAddress,
      endAddressLat,
      endAddressLon,
      price,
      suggestedPrice,
      driverPercent,
      silverPercent,
      carId,
      reservePolyline
    );
    return res.status(201).json(reserve);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

const update = async (req, res) => {
  const { id } = req.params;

  const {
    userId,
    driverId,
    enterpriseId,
    silverCarId,
    tripType,
    serviceType,
    serviceCarType,
    startTime,
    startAddress,
    startAddressLat,
    startAddressLon,
    endAddress,
    endAddressLat,
    endAddressLon,
    price,
    suggestedPrice,
    driverPercent,
    silverPercent,
    carId,
    reservePolyline
  } = req.body;
  try {
    if (!id) throw new Error("Missing data");
    const updatedReserve = await ReserveService.update(
      +id,
      userId,
      driverId,
      enterpriseId,
      silverCarId,
      tripType,
      serviceType,
      serviceCarType,
      startTime,
      startAddress,
      startAddressLat,
      startAddressLon,
      endAddress,
      endAddressLat,
      endAddressLon,
      price,
      suggestedPrice,
      driverPercent,
      silverPercent,
      carId,
      reservePolyline
    );
    return res.status(200).json(updatedReserve);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

const erase = async (req, res) => {
  const { id } = req.params;
  try {
    if (!+id) throw new Error("Id must be an integer");
    await ReserveService.erase(id);
    return res.status(204).json();
  } catch (error) {
    errorHandler(error, req, res);
  }
};

const getReservesHome = async (req, res) => {
  const { page } = req.query;
  try {
    const reserves = await ReserveService.getReservesHome(page);
    return res.status(200).json(reserves);
  } catch (error) {
    errorHandler(error, req, res);
  }
};
const getReserveHomeByQuery = async (req, res) => {
  const { query } = req.query;
  try {
    if (!query) throw new Error("Missing data");
    const reserves = await ReserveService.getReserveHomeByQuery(query);
    return res.status(200).json(reserves);
  } catch (error) {
    errorHandler(error, req, res);
  }
};
const getReservesList = async (req, res) => {
  const { page } = req.query;
  try {
    const reserves = await ReserveService.getReservesList(page);
    return res.status(200).json(reserves);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

const getDriverReservesList = async (req, res) => {
  const { page } = req.query;
  const { id } = req.params;
  try {
    const reserves = await ReserveService.getDriverReservesList(page, id);
    return res.status(200).json(reserves);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

const getReserveDetail = async (req, res) => {
  const { id } = req.params;
  try {
    const reserve = await ReserveService.getReserveDetail(id);
    return res.status(200).json(reserve);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

const getDriverReserveDetail = async (req, res) => {
  const { id } = req.params;
  try {
    const reserve = await ReserveService.getDriverReserveDetail(id);
    return res.status(200).json(reserve);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

const getReserveByQuery = async (req, res) => {
  const { query } = req.query;
  try {
    if (!query) throw new Error("Missing data");
    const reserves = await ReserveService.getReserveByQuery(query);
    return res.status(200).json(reserves);
  } catch (error) {
    errorHandler(error, req, res);
  }
};
const getDriverNearestReserve = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) throw new Error("Missing data");
    const reserve = await ReserveService.getDriverNearestReserve(id);
    return res.status(200).json(reserve);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

const getDriverReservesHome = async (req, res) => {
  const { page, id } = req.query;
  try {
    const reserves = await ReserveService.getDriverReservesHome(page, id);
    return res.status(200).json(reserves);
  } catch (error) {
    errorHandler(error, req, res);
  }
};
const getDriverReserveByQuery = async (req, res) => {
  const { query } = req.query;
  const { id } = req.params;

  try {
    if (!query) throw new Error("Missing data");
    const reserves = await ReserveService.getDriverReserveByQuery(query, id);
    return res.status(200).json(reserves);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

const createDriverPerHourStop = async (req, res) => {
  const { id } = req.params;
  const { endAddress, endAddressLat, endAddressLon, tripId } = req.body;
  try {
    if (!id) throw new Error("Missing data");
    const updatedReserve = await ReserveService.updateEndAddress(
      id,
      endAddress,
      endAddressLat,
      endAddressLon,
      tripId
    );

    return res.status(200).json(updatedReserve);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

const ReserveRouter = Router();

ReserveRouter.get("/", jwtCheck, requiredScopes('admin'), getAll);
ReserveRouter.post("/", jwtCheck, requiredScopes('admin'), create);
ReserveRouter.get("/admin-home", jwtCheck, requiredScopes('admin'), getReservesHome);
ReserveRouter.get("/admin-search-home", jwtCheck, requiredScopes('admin'), getReserveHomeByQuery);
ReserveRouter.get("/admin-reserves", jwtCheck, requiredScopes('admin'), getReservesList);
ReserveRouter.get("/admin-reserves/:id", jwtCheck, requiredScopes('admin'), getReserveDetail);
ReserveRouter.get("/driver-home", jwtCheck, requiredScopes('driver'), getDriverReservesHome);
ReserveRouter.get("/driver-reserves-list/:id", jwtCheck, requiredScopes('driver'), getDriverReservesList);
ReserveRouter.get("/driver-reserves/:id", jwtCheck, requiredScopes('driver'), getDriverReserveDetail)
ReserveRouter.get("/driver-nearest/:id", jwtCheck, requiredScopes('driver'), getDriverNearestReserve);
ReserveRouter.get("/search", jwtCheck, requiredScopes('admin'), getReserveByQuery);
ReserveRouter.get("/driver-search/:id", jwtCheck, requiredScopes('driver'), getDriverReserveByQuery);
ReserveRouter.post("/driver-stop/:id", jwtCheck, requiredScopes('driver'), createDriverPerHourStop);
ReserveRouter.get("/:id", jwtCheck, requiredScopes('admin'), get);
ReserveRouter.patch("/:id", jwtCheck, requiredScopes('admin'), update);
ReserveRouter.delete("/:id", jwtCheck, requiredScopes('admin'), erase);

module.exports = ReserveRouter;
