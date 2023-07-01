const { User } = require("../../database");

const getUserDataController = async (id) => {
    const user = User.findOne({ where: { id } });

    return user;
};

module.exports = getUserDataController;
