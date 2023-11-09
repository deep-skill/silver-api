const { Router } = require("express");
const StopService = require("../service/StopService");

const getAll = async (req, res) => {
  try {
    const stops = await StopService.getAll();
    return res.status(200).json(stops);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const get = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) throw new Error("Missing data");
    const stop = await StopService.get(id);
    return res.status(200).json(stop);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const create = async (req, res) => {
  const { id , location } = req.body;
  try {
    const stop = await StopService.create(id , location);
    return res.status(201).json(stop);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { location} = req.body;
  try {
    if (!id) throw new Error("Missing data");
    const updatedStop = await StopService.update(
      id,
      location
    );
    return res.status(200).json(updatedStop);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const erase = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) throw new Error("Missing data");
    const deletedStop = await StopService.erase(id);
    return res.status(204).json(deletedStop);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const stopRouter = Router();

/* ReserveRouters.get("/", jwtCheck, getReservesHandler); */
stopRouter.get("/", getAll);
stopRouter.post("/", create);
stopRouter.get("/:id", get);
stopRouter.put("/:id", update);
stopRouter.delete("/:id", erase);

module.exports = stopRouter;