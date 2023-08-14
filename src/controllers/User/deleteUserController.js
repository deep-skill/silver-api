const { User } = require("../../database");

const deleteUserController = async (id) => {
  const user = await User.findOne({ where: { id } });
  await user.destroy();
  return {
    deleted: true,
    user,
  };
};

module.exports = deleteUserController;
