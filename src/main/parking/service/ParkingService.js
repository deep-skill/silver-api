const { Parking, Trip } = require("../../database");
const Sequelize = require("sequelize");

const getAll = async () => {
  return Parking.findAll();
};

const get = async (id) => {
  return Parking.findOne({
    include: [
      {
        model: Trip,
      },
    ],
    where: { id },
  });
};

const create = async (tripId, amount, name) => {
  return await Parking.create({
    tripId,
    amount,
    name 
  });
};

const update = async (id, amount, name ,tripId) => {
  const parking = await Parking.findOne({ where: { id } });
  if (!parking) throw new Error("Trip not exist");

  amount ? (parking.amount = amount) : null;
  name ? (parking.name = name) : null;
  tripId ? (parking.tripId = tripId) : null;

  await parking.save();
  return parking;
};

const erase = async (id) => {
  const parking = await Parking.findOne({ where: { id } });
  await parking.destroy();
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
