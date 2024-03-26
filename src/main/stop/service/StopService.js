const { Stop, Trip } = require("../../database");
const Sequelize = require("sequelize");

const getAll = async () => {
  return Stop.findAll();
};

const get = async (id) => {
  return Stop.findOne({
    include: [
      {
        model: Trip,
      },
    ],
    where: { id },
  });
};

const create = async (tripId, location, lat, lon) => {
  return await Stop.create({
    tripId,
    location,
    lat,
    lon,
  });
};

const update = async (id, tripId, location, lat, lon, arrived) => {
  const stop = await Stop.findOne({ where: { id } });
  if (!stop) throw new Error("Stop not exist");

  tripId ? (stop.tripId = tripId) : null;
  location ? (stop.location = location) : null;
  lat ? (stop.lat = lat) : null;
  lon ? (stop.lon = lon) : null;
  arrived ? (stop.arrived = arrived) : null;

  await stop.save();
  return stop;
};

const erase = async (id) => {
  const stop = await Stop.findOne({ where: { id } });
  await stop.destroy();
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
