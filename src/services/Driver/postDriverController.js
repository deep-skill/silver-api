const { Driver } = require("../../database");

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

module.exports = postDriverController;