const { User } = require("../../database");

const getUserByIdController = async (id) => {
    const user = User.findOne({ where: { id } });

    return user;
};

module.exports = getUserByIdController;
