const { Driver } = require("../../database");

const deleteDriverController = async (id) => {
  const driver = await Driver.findOne({ where: { id } });
  await driver.destroy();
  return {
    deleted: true,
    driver,
  };
};

const getDriverByIdController = async (id) => {
  const driver = Driver.findOne({ where: { id } });
  return driver;
};

const getDriversController = async () => {
  const drivers = await Driver.findAll();
  return drivers;
};

const postDriverController = async (
    car_id,
    name,
    last_name,
    dni,
    ruc,
    license_number,
    phone_number,
    email,
    address,
    bank_name,
    bank_account_type,
    bank_account,
    rating,
) => {
  const newDriver = await Driver.create({
    car_id,
    name,
    last_name,
    dni,
    ruc,
    license_number,
    phone_number,
    email,
    address,
    bank_name,
    bank_account_type,
    bank_account,
    rating,
  });
  return {
    created: true,
  };
};

const putDriverController = async (
    id,
    car_id,
    name,
    last_name,
    dni,
    ruc,
    license_number,
    phone_number,
    email,
    address,
    bank_name,
    bank_account_type,
    bank_account,
    rating,
) => {
  const driver = await Driver.findOne({ where: { id } });

  car_id ? (driver.car_id = car_id) : null;
  name ? (driver.name = name) : null;
  last_name ? (driver.last_name = last_name) : null;
  dni ? (driver.dni = dni) : null;
  ruc ? (driver.ruc = ruc) : null;
  license_number ? (driver.license_number = ruc) : null;
  phone_number ? (driver.phone_number = phone_number) : null;
  email ? (driver.email = email) : null;
  address ? (driver.address = address) : null;
  bank_name ? (driver.bank_name = bank_name) : null;
  bank_account_type ? (driver.bank_account_type = bank_account_type) : null;
  bank_account ? (driver.bank_account = bank_account) : null;
  rating ? (driver.rating = rating) : null;

  await driver.save();

  return {
    updated: true,
  };
};

module.exports = putDriverController;
module.exports = postDriverController;
module.exports = getDriversController;
module.exports = getDriverByIdController;
module.exports = deleteDriverController;