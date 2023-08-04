const { User } = require("../../database");

const postUserController = async (name, email, phone, address, license) => {

    const newUser = await User.create({name, email, phone, address, license});

    return newUser;
};

module.exports = postUserController;