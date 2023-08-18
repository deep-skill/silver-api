const {Car} = require("../../../database");

const getAll = async () => {
  return Car.findAll();
};

const get = async (id) => {
  return Car.findOne({where: {id}});
};

const create = async (
    licensePlate,
    owner,
    brand,
    model,
    type,
    color,
    year
) => {
  return await Car.create({
    licensePlate,
    owner,
    brand,
    model,
    type,
    color,
    year
  });
};

const update = async (
    id,
    licensePlate,
    owner,
    brand,
    model,
    type,
    color,
    year
) => {
  const car = await Car.findOne({where: {id}});
  licensePlate ? (car.licensePlate = licensePlate) : null;
  owner ? (car.owner = owner) : null;
  brand ? (car.brand = brand) : null;
  model ? (car.model = model) : null;
  type ? (car.type = type) : null;
  color ? (car.color = color) : null;
  year ? (car.year = year) : null;
  await car.save();

  return car;
};

const erase = async (id) => {
  const car = await Car.findOne({where: {id}});
  await car.destroy();
};

module.exports = {getAll, get, create, erase, update};