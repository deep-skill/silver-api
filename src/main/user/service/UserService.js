const { User, Enterprise } = require("../../database");
const Sequelize = require("sequelize");

const getAll = async () => {
  return User.findAll();
};

const get = async (id) => {
  return User.findOne({ where: { id } });
};

const create = async (
  enterpriseId,
  role,
  name,
  lastName,
  dni,
  ruc,
  phoneNumber,
  email,
  address
) => {
  return await User.create({
    enterpriseId,
    role,
    name,
    lastName,
    dni,
    ruc,
    phoneNumber,
    email,
    address,
  });
};

const update = async (
  id,
  enterpriseId,
  role,
  name,
  lastName,
  dni,
  ruc,
  phoneNumber,
  email,
  address
) => {
  const user = await User.findOne({ where: { id } });
  if (!user) throw new Error("Driver not exist");

  enterpriseId ? (user.enterpriseId = enterpriseId) : null;
  role ? (user.role = role) : null;
  name ? (user.name = name) : null;
  lastName ? (user.lastName = lastName) : null;
  dni ? (user.dni = dni) : null;
  ruc ? (user.ruc = ruc) : null;
  phoneNumber ? (user.phoneNumber = phoneNumber) : null;
  email ? (user.email = email) : null;
  address ? (user.address = address) : null;

  await user.save();

  return user;
};

const erase = async (id) => {
  const user = await User.findOne({ where: { id } });
  await user.destroy();
  return {
    deleted: true,
  };
};

const getUserByName = async (query) => {

  if(query === "") return await User.findAll({
    attributes: ["id", "name", "lastName"]
  });

  return await User.findAll({
    attributes: ["id", "name", "lastName"],
    include: {
      model: Enterprise,
      attributes: ["id"],
    },
    where: {
      [Sequelize.Op.and]: [
        {
          [Sequelize.Op.or]: [
            {
              name: {
                [Sequelize.Op.iLike]: `%${query}%`,
              },
            },
            {
              lastName: {
                [Sequelize.Op.iLike]: `%${query}%`,
              },
            },
          ],
        },
        {
          role: {
            [Sequelize.Op.eq]: "passenger",
          },
        },
      ],
    },
  });
};

module.exports = { getAll, get, create, erase, update, getUserByName };
