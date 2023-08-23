const { Driver, DriverAccount, Car } = require("../../../database");

const getAll = async () => {
  return Driver.findAll({ include: [DriverAccount, Car] });
};

const get = async (id) => {
  return Driver.findOne({ where: { id } });
};

const create = async (
  carId,
  driverAccountId,
  name,
  lastName,
  dni,
  ruc,
  licenseNumber,
  phoneNumber,
  email,
  address,
) => {
  const driver = await Driver.create({
    carId,
    driverAccountId,
    name,
    lastName,
    dni,
    ruc,
    licenseNumber,
    phoneNumber,
    email,
    address,
  });
  return {
    driver
  };
};

const update = async (
  id,
  carId,
  driverAccountId,
  name,
  lastName,
  dni,
  ruc,
  licenseNumber,
  phoneNumber,
  email,
  address,
) => {
  const driver = await Driver.findOne({ where: { id } });
  if(!driver) throw new Error("Driver not exist");

  carId ? (driver.carId = carId) : null;
  driverAccountId ? (driver.driverAccountId = driverAccountId) : null;
  name ? (driver.name = name) : null;
  lastName ? (driver.lastName = lastName) : null;
  dni ? (driver.dni = dni) : null;
  ruc ? (driver.ruc = ruc) : null;
  licenseNumber ? (driver.licenseNumber = licenseNumber) : null;
  phoneNumber ? (driver.phoneNumber = phoneNumber) : null;
  email ? (driver.email = email) : null;
  address ? (driver.address = address) : null;

  await driver.save();

  return {
    driver,
  };
};

const erase = async (id) => {
  const driver = await Driver.findOne({ where: { id } });
  await driver.destroy();
  return {
    deleted: true,
  };
};

module.exports = {getAll, get, create, erase, update};