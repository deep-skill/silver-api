const {Toll, Trip } = require("../../database");
const Sequelize = require("sequelize");

const getAll = async () => {
  return Toll.findAll();
};

const get = async (id) => {
  return Toll.findOne({
    include: [
      {
        model: Trip,
      },
    ],
    where: { id },
  });
};

const create = async (tripId, name, amount, lat, lon) => {
  return await Toll.create({
    tripId,
    name,
    amount,
    lat,
    lon
  });
};

const update = async (id, tripId, name, amount, lat, lon) => {
  const toll = await Toll.findOne({ where: { id } });
  if (!toll) throw new Error("Toll not exist");

  tripId ?(toll.tripId = tripId) : null;
  name ? (toll.name = name) : null;
  amount ?(toll.amount = amount) : null;
  lat ?(toll.lat = lat) : null;
  lon ?(toll.lon = lon) : null;

  await toll.save();
  return toll;
};

const erase = async (id) => {
  const toll = await Toll.findOne({ where: { id } });
  if (!toll) throw new Error("Toll not exist");
  await toll.destroy();
  return toll;
};

module.exports = {
  getAll,
  get,
  create,
  erase,
  update,
};
