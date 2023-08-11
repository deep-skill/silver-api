const { User } = require("../../database");

const putUserController = async (
    id,
    role,
    name,
    last_name,
    dni,
    ruc,
    phone_number,
    email,
    address,
    license,
    rating,
    enterprise_ruc) => {
    const user = await User.findOne({ where: { id } });

    ruc ? (user.ruc = ruc) : null;
    name ? (user.name = name) : null;
    address ? (user.address = address) : null;
    role ? (user.role = role) : null;
    name ? (user.name = name) : null;
    last_name ? (user.last_name = last_name) : null;
    dni ? (user.dni = dni) : null;
    ruc ? (user.ruc = ruc) : null;
    phone_number ? (user.phone_number = phone_number) : null;
    email ? (user.email = email) : null;
    address ? (user.address = address) : null;
    license ? (user.license = license) : null;
    rating ? (user.rating = rating) : null;
    enterprise_ruc ? (user.enterprise_ruc = enterprise_ruc) : null;

    await user.save();

    return {
        updated: true,
        user,
    };
};

module.exports = putUserController;