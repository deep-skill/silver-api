const { Router } = require("express");
const {requiredScopes} = require('express-oauth2-jwt-bearer');
const jwtCheck = require('../../jwtCheck');
const ObservationService = require("../service/ObservationService");

const getAll = async (req, res) => {
  try {
    const observations = await ObservationService.getAll();
    return res.status(200).json(observations);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const get = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) throw new Error("Missing data");
    const observation = await ObservationService.get(id);
    return res.status(200).json(observation);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const create = async (req, res) => {
  const { tripId, observation } = req.body;
  try {
    const newObservation = await ObservationService.create( tripId, observation );
    return res.status(201).json(observation);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { observation, tripId } = req.body;
  try {
    if (!id) throw new Error("Missing data");
    const updatedObservation = await ObservationService.update(
      id,
      observation,
      tripId 
    );
    return res.status(200).json(updatedObservation);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const erase = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) throw new Error("Missing data");
    await ObservationService.erase(id);
    return res.status(204).json("Observation deleted");
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const ObservationRouter = Router();

ObservationRouter.get("/", getAll);
ObservationRouter.post("/", jwtCheck, requiredScopes('admin'), create);
ObservationRouter.get("/:id", get);
ObservationRouter.put("/:id", update);
ObservationRouter.delete("/:id", jwtCheck, requiredScopes('admin'), erase);


module.exports = ObservationRouter;
