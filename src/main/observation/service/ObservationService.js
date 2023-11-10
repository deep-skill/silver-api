const { Observation, Trip } = require("../../database");
const Sequelize = require("sequelize");

const getAll = async () => {
  return Observation.findAll();
};

const get = async (id) => {
  return Observation.findOne({
    include: [
      {
        model: Trip,
      },
    ],
    where: { id },
  });
};

const create = async ( tripId, observation) => {
  return await Observation.create({
    tripId,
    observation,
  });
};

const update = async (id, observation ,tripId ) => {
  const updatedObservation = await Observation.findOne({ where: { id } });
  if (!updatedObservation) throw new Error("Observation not exist");
  
  tripId ? (updatedObservation.tripId = tripId) : null
  observation ?  (updatedObservation.observation = observation) : null

  await updatedObservation.save();
  return updatedObservation;
};

const erase = async (id) => {
  const observation = await Observation.findOne({ where: { id } });
  await observation.destroy();
  return {
    deleted: true,
  };
};

module.exports = {
  getAll,
  get,
  create,
  erase,
  update,
};
