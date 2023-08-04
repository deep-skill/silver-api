const { User } = require("../../database");

const putUserDataController = async (id, phone, address, license, rating) => {
    const user = await User.findOne({ where: { id } });

    user.phone = phone;
    user.address = address;
    user.license = license;
    user.rating = rating;

    await user.save();

    return {
        updated: true,
        name: user.name,
    };
};

module.exports = putUserDataController;