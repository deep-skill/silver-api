const { Driver } = require("../../database");

const putDriverController = async (
  id,
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
  car_brand,
  car_model,
  car_year,
  rating,
  ) => {
    const driver = await Driver.findOne({ where: { id } });
    
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
    car_brand ? (driver.car_brand = car_brand) : null;
    car_model ? (driver.car_model = car_model) : null;
    car_year ? (driver.car_year = car_year) : null;
    rating ? (driver.rating = rating) : null;

    await driver.save();

    return {
      updated: true,
      driver,
    };
};

module.exports = putDriverController;