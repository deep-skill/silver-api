const { User } = require("../../database");

const statusUserDataController = async (email, status) => {
    const user = await User.findOne({ where: { email } });

    user.status = status;

    await user.save();

    return {
        updated: true,
        email,
        status,
    };
};

module.exports = statusUserDataController;
