const { User } = require("../../database");

const postUserController = async (
  role,
  name,
  last_name,
  dni,
  ruc,
  phone_number,
  email,
  address,
  rating,
  enterprise_ruc
  ) => {
    const newUser = await User.create({
      role,
      name,
      last_name,
      dni,
      ruc,
      phone_number,
      email,
      address,
      rating,
      enterprise_ruc
  });
  return newUser;
};

module.exports = postUserController;