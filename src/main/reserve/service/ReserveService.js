const { Reserve, User, Enterprise, Driver, Car } = require("../../database");
const Sequelize = require("sequelize");

const getAll = async () => {
  return Reserve.findAll();
};

const get = async (id) => {
  return Reserve.findOne({ where: { id } });
};

const create = async (
  userId,
  driverId,
  enterpriseId,
  silverCarId,
  tripType,
  serviceType,
  startTime,
  startAddress,
  endAddress,
  price,
  driverPercent,
  silverPercent
) => {
  return await Reserve.create({
    userId,
    driverId,
    enterpriseId,
    silverCarId,
    tripType,
    serviceType,
    startTime,
    startAddress,
    endAddress,
    price,
    driverPercent,
    silverPercent,
  });
};

const update = async (
  id,
  userId,
  driverId,
  enterpriseId,
  silverCarId,
  tripType,
  serviceType,
  startTime,
  startAddress,
  endAddress,
  price,
  driverPercent,
  silverPercent
) => {
  const reserve = await Reserve.findOne({ where: { id } });
  if (!reserve) throw new Error("Driver not exist");

  userId ? (reserve.userId = userId) : null;
  driverId ? (reserve.driverId = driverId) : null;
  enterpriseId ? (reserve.enterpriseId = enterpriseId) : null;
  silverCarId ? (reserve.silverCarId = silverCarId) : null;
  tripType ? (reserve.tripType = tripType) : null;
  serviceType ? (reserve.serviceType = serviceType) : null;
  startTime ? (reserve.startTime = startTime) : null;
  startAddress ? (reserve.startAddress = startAddress) : null;
  endAddress ? (reserve.endAddress = endAddress) : null;
  price ? (reserve.price = price) : null;
  driverPercent ? (reserve.driverPercent = driverPercent) : null;
  silverPercent ? (reserve.silverPercent = silverPercent) : null;

  await reserve.save();

  return reserve;
};

const erase = async (id) => {
  const reserve = await Reserve.findOne({ where: { id } });
  await reserve.destroy();
};

const getPaginated = async (page, size = 10) => {
  return await Reserve.findAndCountAll({
    limit: size,
    offset: page * size,
  });
};

const getReservesHome = async (page) => {
  return await Reserve.findAndCountAll({
    limit: 10,
    offset: page * 10,
    attributes: ["id", "tripType", "startTime"],
    include: [
      {
        model: User,
        attributes: ["name", "lastName"],
      },
      {
        model: Enterprise,
        attributes: ["name"],
      },
    ],
    where: {
      driverId: null,
    },
  });
};

const getReservesList = async (page) => {
  return await Reserve.findAndCountAll({
    limit: 10,
    offset: page * 10,
    attributes: ["id", "tripType", "startTime"],
    include: [
      {
        model: User,
        attributes: ["name", "lastName"],
      },
      {
        model: Enterprise,
        attributes: ["name"],
      },
      {
        model: Driver,
        attributes: ["name", "lastName"],
      },
      {
        model: Car,
        attributes: ["type"],
      },
    ],
  });
};

const getReserveDetail = async (id) => {
  return await Reserve.findOne({
    attributes: [
      "id",
      "startTime",
      "serviceType",
      "tripType",
      "startAddress",
      "endAddress",
      "price",
      "silverPercent",
    ],
    include: [
      {
        model: User,
        attributes: ["id", "name", "lastName"],
      },
      {
        model: Enterprise,
        attributes: ["id", "name"],
      },
      {
        model: Driver,
        attributes: ["id", "name", "lastName"],
      },
      {
        model: Car,
        attributes: ["id", "type", "licensePlate", "brand", "model", "color"],
      },
    ],
    where: { id },
  });
};

const getReserveByQuery = async (query) => {
  return await Reserve.findAll({
    attributes: ["id", "tripType", "startTime"],
    include: [
      {
        model: User,
        attributes: ["name", "lastName"],
      },
      {
        model: Enterprise,
        attributes: ["name"],
      },

      {
        model: Driver,
        attributes: ["name", "lastName"],
      },
      {
        model: Car,
        attributes: ["type"],
      },
    ],
    where: {
      [Sequelize.Op.or]: [
        {
          startAddress: {
            [Sequelize.Op.iLike]: `%${query}%`,
          },
        },
        {
          endAddress: {
            [Sequelize.Op.iLike]: `%${query}%`,
          },
        },
        Sequelize.where(
          Sequelize.cast(Sequelize.col("start_time"), "varchar"),
          { [Sequelize.Op.iLike]: `%${query}%` }
        ),
        Sequelize.where(
          Sequelize.cast(Sequelize.col("service_type"), "varchar"),
          { [Sequelize.Op.iLike]: `%${query}%` }
        ),
        Sequelize.where(Sequelize.cast(Sequelize.col("trip_type"), "varchar"), {
          [Sequelize.Op.iLike]: `%${query}%`,
        }),

        {
          "$User.name$": {
            [Sequelize.Op.iLike]: `%${query}%`,
          },
        },
        {
          "$User.last_name$": {
            [Sequelize.Op.iLike]: `%${query}%`,
          },
        },
        {
          "$Enterprise.name$": {
            [Sequelize.Op.iLike]: `%${query}%`,
          },
        },
        {
          "$Driver.name$": {
            [Sequelize.Op.iLike]: `%${query}%`,
          },
        },
        {
          "$Driver.last_name$": {
            [Sequelize.Op.iLike]: `%${query}%`,
          },
        },
        {
          "$Car.license_plate$": {
            [Sequelize.Op.iLike]: `%${query}%`,
          },
        },
        {
          "$Car.brand$": {
            [Sequelize.Op.iLike]: `%${query}%`,
          },
        },
        {
          "$Car.model$": {
            [Sequelize.Op.iLike]: `%${query}%`,
          },
        },
      ],
    },
  });
};

module.exports = {
  getAll,
  get,
  create,
  erase,
  update,
  getPaginated,
  getReservesHome,
  getReservesList,
  getReserveDetail,
  getReserveByQuery,
};
