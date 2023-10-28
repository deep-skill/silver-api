const { Router } = require("express");
const ReserveService = require("../service/ReserveService");

const getAll = async (req, res) => {
  const { page, size } = req.query;
  if (page) {
    try {
      const reserves = await ReserveService.getPaginated(page, size);
      return res.status(200).json(reserves);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  } else {
    try {
      const reserves = await ReserveService.getAll();
      return res.status(200).json(reserves);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
};

const get = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) throw new Error("Missing data");
    const reserve = await ReserveService.get(id);
    return res.status(200).json(reserve);
  } catch (error) {
    return res.status(400).json({ error: error.message });
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
    startTime,
    startAddress,
    endAddress,
    price,
    driverPercent,
    silverPercent,
  } = req.body;
  try {
    const reserve = await ReserveService.create(
      userId,
      driverId,
      enterpriseId,
      silverCarId,
      tripType,
      serviceType,
      startTime,
      startAddress,
      endAddress,
      price,
      driverPercent,
      silverPercent
    );
    return res.status(201).json(reserve);
  } catch (error) {
    return res.status(400).json({ error: error.message });
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
    startTime,
    startAddress,
    endAddress,
    price,
    driverPercent,
    silverPercent,
  } = req.body;
  try {
    if (!id) throw new Error("Missing data");
    const updatedReserve = await ReserveService.update(
      id,
      userId,
      driverId,
      enterpriseId,
      silverCarId,
      tripType,
      serviceType,
      startTime,
      startAddress,
      endAddress,
      price,
      driverPercent,
      silverPercent
    );
    return res.status(200).json(updatedReserve);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const erase = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) throw new Error("Missing data");
    await ReserveService.erase(id);
    return res.status(204).json();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getReservesHome = async (req, res) => {
  const { page } = req.query;
  try {
    const reserves = await ReserveService.getReservesHome(page);
    return res.status(200).json(reserves);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getReservesList = async (req, res) => {
  const { page } = req.query;
  try {
    const reserves = await ReserveService.getReservesList(page);
    return res.status(200).json(reserves);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getReservesHistory = async (req, res) => {
  const { page } = req.query;
  try {
    const trips = await ReserveService.getReservesHistory(page);
    return res.status(200).json(trips);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getReserveDetail = async (req, res) => {
  const { id } = req.params;
  try {
    const reserve = await ReserveService.getReserveDetail(id);
    return res.status(200).json(reserve);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getReserveByQuery = async (req, res) => {
  const { query } = req.query;
  try {
    if (!query) throw new Error("Missing data");
    const reserves = await ReserveService.getReserveByQuery(query);
    return res.status(200).json(reserves);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
const getDriverNearestReserve = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) throw new Error("Missing data");
    const reserve = await ReserveService.getDriverNearestReserve(id);
    return res.status(200).json(reserve);
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

const getDriverReservesHome = async (req, res) => {
  const { page, id } = req.query;
  try {
    const reserves = await ReserveService.getDriverReservesHome(page, id);
    return res.status(200).json(reserves);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const ReserveRouter = Router();

/* driverRouter.get("/", jwtCheck, getDriversHandler); */
ReserveRouter.get("/", getAll);
ReserveRouter.post("/", create);
ReserveRouter.get("/admin-home", getReservesHome);
ReserveRouter.get("/admin-reserves", getReservesList);
ReserveRouter.get("/admin-history", getReservesHistory);

ReserveRouter.get("/admin-reserves/:id", getReserveDetail);

ReserveRouter.get("/driver-nearest/:id", getDriverNearestReserve);
ReserveRouter.get("/driver-home", getDriverReservesHome);
ReserveRouter.get("/search", getReserveByQuery);
ReserveRouter.get("/:id", get);
ReserveRouter.patch("/:id", update);
ReserveRouter.delete("/:id", erase);

module.exports = ReserveRouter;
