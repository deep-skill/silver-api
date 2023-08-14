const { Driver } = require("../../database");

const postDriverController = async (
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
    const newDriver = await Driver.create({
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
    });
  return newDriver;
};

module.exports = postDriverController;