const { SilverCar } = require("../../../database");

const getAll = async () => {
  return SilverCar.findAll();
};

const get = async (id) => {
  return SilverCar.findOne({ where: { id } });
};

const create = async (
  licensePlate,
  brand,
  model,
  type,
  color,
  year
) => {
  await SilverCar.create({
    licensePlate,
    brand,
    model,
    type,
    color,
    year
  });
  return {
    created: true,
  };
};

const update = async (
  id,
  licensePlate,
  brand,
  model,
  type,
  color,
  year
) => {
  const silverCar = await SilverCar.findOne({ where: { id } });
  if(!silverCar) throw new Error("Driver not exist");

  licensePlate ? (silverCar.licensePlate = licensePlate) : null;
  brand ? (silverCar.brand = brand) : null;
  model ? (silverCar.model = model) : null;
  type ? (silverCar.type = type) : null;
  color ? (silverCar.color = color) : null;
  year ? (silverCar.year = year) : null;

  await silverCar.save();

  return {
    silverCar,
  };
};

const erase = async (id) => {
  const silverCar = await SilverCar.findOne({ where: { id } });
  await silverCar.destroy();
  return {
    deleted: true,
  };
};

module.exports = {getAll, get, create, erase, update};