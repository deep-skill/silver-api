const {Stop, Trip } = require("../../database");
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

const create = async (id , location) => {
  return await Stop.create({
    id,
    location
  });
};

const update = async (id, location) => {
  const stop = await Stop.findOne({ where: { id } });
  if (!stop) throw new Error("Stop not exist");
  if(location) {
    stop.location = location
  }

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
