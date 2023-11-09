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

const create = async ( name , amount, lat , lon) => {
  return await Toll.create({
    name,
    amount,
    lat,
    lon
  });
};

const update = async (id, name , amount , lat , lon) => {
  const toll = await Toll.findOne({ where: { id } });
  if (!toll) throw new Error("Toll not exist");

  name ? (toll.name = name) : null;
  amount ?(toll.amount = amount) : null;
  lat ?(toll.lat = lat) : null;
  lon ?(toll.lon = lon) : null;

  await toll.save();
  return toll;
};

const erase = async (id) => {
  const toll = await Toll.findOne({ where: { id } });
  await toll.destroy();
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
