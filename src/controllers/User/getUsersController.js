const { User } = require("../../database");

const getUsersController = async () => {
  const users = await User.findAll()
  return users;
};

module.exports = getUsersController;
