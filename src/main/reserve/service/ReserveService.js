const {
  Reserve,
  User,
  Enterprise,
  Driver,
  Car,
  Trip,
  Stop,
} = require("../../database");
const Sequelize = require("sequelize");

const getAll = async () => {
  return Reserve.findAll();
};

const get = async (id) => {
  return Reserve.findOne({
    where: { id },
  });
};

const create = async (
  userId,
  driverId,
  enterpriseId,
  silverCarId,
  tripType,
  serviceType,
  serviceCarType,
  startTime,
  startAddress,
  startAddressLat,
  startAddressLon,
  endAddress,
  endAddressLat,
  endAddressLon,
  price,
  suggestedPrice,
  driverPercent,
  silverPercent,
  carId,
  reservePolyline,
  reserveDistanceMeters
) => {
  return await Reserve.create({
    userId,
    driverId,
    enterpriseId,
    silverCarId,
    tripType,
    serviceType,
    serviceCarType,
    startTime,
    startAddress,
    startAddressLat,
    startAddressLon,
    endAddress,
    endAddressLat,
    endAddressLon,
    price,
    suggestedPrice,
    driverPercent,
    silverPercent,
    carId,
    reservePolyline,
    reserveDistanceMeters
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
  serviceCarType,
  startTime,
  startAddress,
  startAddressLat,
  startAddressLon,
  endAddress,
  endAddressLat,
  endAddressLon,
  price,
  suggestedPrice,
  driverPercent,
  silverPercent,
  carId,
  reservePolyline,
  reserveDistanceMeters
) => {
  const reserve = await Reserve.findOne({ where: { id } });
  if (!reserve) throw new Error("Driver not exist");

  userId ? (reserve.userId = userId) : null;
  driverId ? (reserve.driverId = driverId) : null;
  enterpriseId ? (reserve.enterpriseId = enterpriseId) : reserve.enterpriseId = null;
  silverCarId ? (reserve.silverCarId = silverCarId) : null;
  tripType ? (reserve.tripType = tripType) : null;
  serviceType ? (reserve.serviceType = serviceType) : null;
  serviceCarType ? (reserve.serviceCarType = serviceCarType) : null;
  startTime ? (reserve.startTime = startTime) : null;
  startAddress ? (reserve.startAddress = startAddress) : null;
  startAddressLat ? (reserve.startAddressLat = startAddressLat) : null;
  startAddressLon ? (reserve.startAddressLon = startAddressLon) : null;
  reserve.endAddress = endAddress;
  reserve.endAddressLat = endAddressLat;
  reserve.endAddressLon = endAddressLon;
  price ? (reserve.price = price) : null;
  suggestedPrice ? (reserve.suggestedPrice = suggestedPrice) : null;
  driverPercent ? (reserve.driverPercent = driverPercent) : null;
  silverPercent ? (reserve.silverPercent = silverPercent) : null;
  carId ? (reserve.carId = carId) : null;
  reservePolyline ? (reserve.reservePolyline = reservePolyline) : null;
  reserveDistanceMeters ? (reserve.reserveDistanceMeters = reserveDistanceMeters) : null;

  await reserve.save();

  return reserve;
};
const updateEndAddress = async (
  id,
  endAddress,
  endAddressLat,
  endAddressLon,
  tripId
) => {
  const reserve = await Reserve.findOne({ where: { id } });

  if (!reserve) throw new Error("Driver not exist");

  if (reserve.endAddress == null) {
    endAddress ? (reserve.endAddress = endAddress) : null;
    endAddressLat ? (reserve.endAddressLat = endAddressLat) : null;
    endAddressLon ? (reserve.endAddressLon = endAddressLon) : null;
    await reserve.save();
    return reserve;
  } else {
    await Stop.create({
      tripId,
      location: reserve.endAddress,
      lat: reserve.endAddressLat,
      lon: reserve.endAddressLon,
    });

    endAddress ? (reserve.endAddress = endAddress) : null;
    endAddressLat ? (reserve.endAddressLat = endAddressLat) : null;
    endAddressLon ? (reserve.endAddressLon = endAddressLon) : null;

    await reserve.save();
    return reserve;
  }
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
  const today = new Date();
  const tomorrow = new Date();
  today.setDate(today.getDate() - 1);
  tomorrow.setDate(tomorrow.getDate() + 1);

  return await Reserve.findAndCountAll({
    limit: 10,
    offset: page * 10,
    attributes: ["id", "tripType", "startTime", "serviceType"],
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
    order: [["startTime", "ASC"]],
  });
};

const getReserveHomeByQuery = async (query) => {
  return await Reserve.findAll({
    attributes: ["id", "tripType", "startTime", "serviceType"],
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
      [Sequelize.Op.or]: [
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
      ],
    },
  });
};

const getReservesList = async (page) => {
  return await Reserve.findAndCountAll({
    limit: 10,
    offset: page * 10,
    attributes: ["id", "tripType", "startTime", "serviceType"],
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
        attributes: ["name", "lastName", "imageUrl"],
      },
      {
        model: Car,
        attributes: ["type"],
      },
      {
        model: Trip,
        attributes: ["id"],
      },
    ],
    where: {
      "$Trip.id$": null,
    },
    order: [["startTime", "ASC"]],
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
      "silverPercent",
      "price",
      "serviceCarType",
      "suggestedPrice",
      "startAddressLat",
      "startAddressLon",
      "endAddressLat",
      "endAddressLon",
      "reservePolyline",
      "reserveDistanceMeters",
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
        attributes: ["id", "name", "lastName", "imageUrl"],
      },
      {
        model: Car,
        attributes: ["id", "type", "licensePlate", "brand", "model", "color"],
      },
      {
        model: Trip,
        attributes: ["id", "status", "totalPrice"],
      },
    ],
    where: { id },
  });
};
const getDriverReserveDetail = async (id) => {
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
      "reserveDistanceMeters",
    ],
    include: [
      {
        model: User,
        attributes: ["name", "lastName"],
      },
      {
        model: Trip,
        attributes: ["status"],
      },
      {
        model: Enterprise,
        attributes: ["name"],
      },
    ],
    where: { id },
  });
};

const getReserveByQuery = async (query) => {
  return await Reserve.findAll({
    attributes: ["id", "tripType", "startTime", "serviceType"],
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
        attributes: ["name", "lastName", "imageUrl"],
      },
      {
        model: Car,
        attributes: ["type"],
      },
      {
        model: Trip,
        attributes: ["id"],
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
          Sequelize.cast(Sequelize.col("Reserve.start_time"), "varchar"),
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
      "$Trip.id$": null,
    },
  });
};

const getDriverNearestReserve = async (id) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const reserve = await Reserve.findOne({
    attributes: ["id", "startTime", "startAddress", "price"],
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
        model: Trip,
        attributes: ["id"],
      },
    ],
    where: {
      driverId: id,
      startTime: {
        [Sequelize.Op.gte]: today,
      },
      [Sequelize.Op.or]: [
        Sequelize.where(Sequelize.cast(Sequelize.col("status"), "varchar"), {
          [Sequelize.Op.like]: `%INPROGRESS%`,
        }),
        {
          "$Trip.id$": null,
        },
      ],
    },
    order: [["startTime", "ASC"]],
  });
  return reserve;
};
const getDriverReservesHome = async (page, id) => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  return await Reserve.findAndCountAll({
    limit: 10,
    offset: page * 10,
    attributes: ["id", "startTime", "startAddress"],
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
        model: Trip,
        attributes: ["id"],
      },
    ],
    where: {
      driverId: id,
      startTime: {
        [Sequelize.Op.between]: [new Date(), new Date(tomorrow)],
      },
      "$Trip.id$": null,
    },
    order: [["startTime", "ASC"]],
  });
};

const getDriverReservesList = async (page, id) => {
  return await Reserve.findAndCountAll({
    limit: 10,
    offset: page * 10,
    attributes: ["id", "tripType", "startTime", "startAddress", "price"],
    where: {
      driverId: id,
      "$Trip.id$": null,
    },
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
        model: Trip,
        attributes: ["id", "status"],
      },
    ],
    order: [["startTime", "ASC"]],
  });
};
const getDriverReserveByQuery = async (query, id) => {
  return await Reserve.findAll({
    attributes: [
      "id",
      "tripType",
      "startTime",
      "startAddress",
      "endAddress",
      "tripType",
      "price",
    ],
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
        model: Trip,
        attributes: ["id", "status"],
      },
    ],
    where: {
      driverId: id,
      "$Trip.id$": null,
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
          Sequelize.cast(Sequelize.col("Reserve.start_time"), "varchar"),
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
      ],
    },
    order: [["startTime", "DESC"]],
  });
};
module.exports = {
  getAll,
  get,
  create,
  erase,
  update,
  updateEndAddress,
  getPaginated,
  getReservesHome,
  getReserveHomeByQuery,
  getReservesList,
  getReserveDetail,
  getReserveByQuery,
  getDriverNearestReserve,
  getDriverReservesHome,
  getDriverReserveDetail,
  getDriverReservesList,
  getDriverReserveByQuery,
};
