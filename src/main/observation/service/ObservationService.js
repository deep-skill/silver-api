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

const create = async ( newObservation,tripId) => {
  return await Observation.create({
    observation: newObservation,
    tripId: tripId
  });
};

const update = async (id, updateObservation ,tripId ) => {
  const observation = await Observation.findOne({ where: { id } });
  if (!observation) throw new Error("Obsetrvation not exist");
  
  updateObservation ?  (observation.observation = updateObservation) : null
  tripId ? (observation.tripId = tripId) : null

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
