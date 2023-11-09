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

const create = async (tripId, newObservation) => {
  return await Observation.create({
    tripId,
    newObservation,
  });
};

const update = async (id, updateObservation) => {
  const observation = await Observation.findOne({ where: { id } });
  if (!observation) throw new Error("Trip not exist");

  updateObservation
    ? (observation.updateObservation = updateObservation)
    : null;

  await observation.save();
  return observation;
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
