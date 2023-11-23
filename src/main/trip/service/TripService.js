const {
  Trip,
  Reserve,
  User,
  Driver,
  Enterprise,
  Observation,
  Stop,
  Parking,
  Toll,
} = require("../../database");
const Sequelize = require("sequelize");
const handleStatusQuery = require("../../../main/utils/handleStatusQuery");
const getAll = async () => {
  return Trip.findAll();
};

const get = async (id) => {
  return Trip.findOne({
    include: [
      {
        model: Reserve,
        attributes: ["id", "startAddress", "endAddress"],
      },
      {
        model: Observation,
      },
      {
        model: Stop,
      },
      {
        model: Parking,
      },
      {
        model: Toll,
      },
    ],
    where: { id },
  });
};

const create = async (
  reserveId,
  totalPrice,
  onWayDriver,
  arrivedDriver,
  startTime
) => {
  return await Trip.create({
    reserveId,
    totalPrice,
    onWayDriver,
    arrivedDriver,
    startTime,
  });
};

const update = async (
  id,
  totalPrice,
  onWayDriver,
  arrivedDriver,
  startTime,
  endTime,
  status,
  driverRating,
  passengerRating
) => {
  const trip = await Trip.findOne({ where: { id } });
  if (!trip) throw new Error("Trip not exist");

  totalPrice ? (trip.totalPrice = totalPrice) : null;
  onWayDriver ? (trip.onWayDriver = onWayDriver) : null;
  arrivedDriver ? (trip.arrivedDriver = arrivedDriver) : null;
  startTime ? (trip.startTime = startTime) : null;
  endTime ? (trip.endTime = endTime) : null;
  status ? (trip.status = status) : null;

  if (driverRating) {
    const reserve = await trip.getReserve();
    const driver = await reserve.getDriver();
    if (trip.driverRating == null) {
      driver.rating =
        (driver.rating * driver.doneTrips + driverRating) /
        (driver.doneTrips + 1);
      driver.doneTrips += 1;
      trip.driverRating = driverRating;
    } else {
      driver.rating =
        (driver.rating * driver.doneTrips - trip.driverRating + driverRating) /
        driver.doneTrips;
      trip.driverRating = driverRating;
    }
    await driver.save();
  }
  if (passengerRating) {
    const reserve = await trip.getReserve();
    const user = await reserve.getUser();
    if (trip.passengerRating == null) {
      user.rating =
        (user.rating * user.doneTrips + passengerRating) / (user.doneTrips + 1);
      user.doneTrips += 1;
      trip.passengerRating = passengerRating;
    } else {
      user.rating =
        (user.rating * user.doneTrips - trip.driverRating + passengerRating) /
        user.doneTrips;
      trip.passengerRating = passengerRating;
    }
    await user.save();
  }
  await trip.save();

  return trip;
};

const erase = async (id) => {
  const trip = await Trip.findOne({ where: { id } });
  await trip.destroy();
  return {
    deleted: true,
  };
};

const getTripsSummary = async () => {
  const today = new Date();
  const totalPrice = await Trip.findAll({
    attributes: ["id", "totalPrice"],
    include: [
      {
        model: Reserve,
        attributes: ["silverPercent"],
      },
    ],
    where: {
      endTime: {
        [Sequelize.Op.between]: [
          new Date(today.getFullYear(), today.getMonth(), 1, 0, 0, 0),
          new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59),
        ],
      },
    },
  });
  const income = totalPrice.reduce((acc, trip) => {
    return acc + trip.totalPrice;
  }, 0);

  const revenue = totalPrice.reduce((acc, trip) => {
    return acc + trip.totalPrice * trip.Reserve.silverPercent * 0.01;
  }, 0);

  const tripMonthSummary = {
    trips: totalPrice.length,
    income,
    revenue: Number(revenue.toFixed(2)),
  };
  return tripMonthSummary;
};
const getTripsHistory = async (page) => {
  return await Trip.findAndCountAll({
    limit: 10,
    offset: page * 10,
    attributes: ["id", "totalPrice", "onWayDriver", "status"],
    include: [
      {
        model: Reserve,
        attributes: ["id", "startAddress"],
        include: [
          {
            model: User,
            attributes: ["id", "name", "lastName"],
          },
          {
            model: Driver,
            attributes: ["id", "name", "lastName"],
          },
          {
            model: Enterprise,
            attributes: ["id", "name"],
          },
        ],
      },
    ],
    order: [["onWayDriver", "DESC"]],
  });
};

const getTripByQuery = async (query) => {
  const statusQuery = handleStatusQuery(query);
  if (statusQuery != undefined) query = statusQuery;
  return await Trip.findAll({
    attributes: ["id", "totalPrice", "onWayDriver", "status"],
    include: [
      {
        model: Reserve,
        attributes: ["id", "startAddress"],
        include: [
          {
            model: User,
            attributes: ["id", "name", "lastName"],
          },
          {
            model: Driver,
            attributes: ["id", "name", "lastName"],
          },
          {
            model: Enterprise,
            attributes: ["id", "name"],
          },
        ],
      },
    ],
    where: {
      [Sequelize.Op.or]: [
        {
          "$Reserve.User.name$": {
            [Sequelize.Op.iLike]: `%${query}%`,
          },
        },
        {
          "$Reserve.User.last_name$": {
            [Sequelize.Op.iLike]: `%${query}%`,
          },
        },
        {
          "$Reserve.start_address$": {
            [Sequelize.Op.iLike]: `%${query}%`,
          },
        },
        {
          "$Reserve.Enterprise.name$": {
            [Sequelize.Op.iLike]: `%${query}%`,
          },
        },
        {
          "$Reserve.Driver.name$": {
            [Sequelize.Op.iLike]: `%${query}%`,
          },
        },
        {
          "$Reserve.Driver.last_name$": {
            [Sequelize.Op.iLike]: `%${query}%`,
          },
        },
        Sequelize.where(
          Sequelize.cast(Sequelize.col("on_way_driver"), "varchar"),
          { [Sequelize.Op.iLike]: `%${query}%` }
        ),
        Sequelize.where(Sequelize.cast(Sequelize.col("status"), "varchar"), {
          [Sequelize.Op.iLike]: `%${query}%`,
        }),
      ],
    },
  });
};
const getDriverMonthSummary = async (id) => {
  const today = new Date();
  const totalPrice = await Trip.findAll({
    attributes: ["id", "totalPrice"],
    include: [
      {
        model: Reserve,
        attributes: ["silverPercent"],
      },
    ],
    where: {
      endTime: {
        [Sequelize.Op.between]: [
          new Date(today.getFullYear(), today.getMonth(), 1, 0, 0, 0),
          new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59),
        ],
      },
      "$Reserve.driver_id$": {
        [Sequelize.Op.eq]: id,
      },
    },
  });
  const income = totalPrice.reduce((acc, trip) => {
    return acc + trip.totalPrice;
  }, 0);

  const revenue = totalPrice.reduce((acc, trip) => {
    return (
      acc +
      trip.totalPrice -
      trip.totalPrice * trip.Reserve.silverPercent * 0.01
    );
  }, 0);

  const tripMonthSummary = {
    trips: totalPrice.length,
    income,
    revenue: Number(revenue.toFixed(2)),
  };
  return tripMonthSummary;
};


  const getAllDriverTrips = async (id, page) => {
    return await Trip.findAndCountAll({
      limit: 10,
      offset: page * 10,
      attributes: ["id", "totalPrice", "onWayDriver", "status"],
      include: [
        {
          model: Reserve,
          where: {
            driverId: id,
          },
          attributes: ["id", "userId", "driverId", "enterpriseId", "silverPercent"],
          include: [
            {
              model: User,
              attributes: ["id", "name", "lastName"],
            },
            {
              model: Driver,
              attributes: ["id", "name", "lastName"],
            },
            {
              model: Enterprise,
              attributes: ["id", "name"],
            },
          ],
        },
        {
          model: Toll
        },
        {
          model: Parking
        }
      ],
      order: [["onWayDriver", "DESC"]],
    });
  };

  const getDriverTripByQuery = async (id, query) => {
    const statusQuery = handleStatusQuery(query);
  if (statusQuery != undefined) query = statusQuery;
    return await Trip.findAll({
      attributes: ["id", "totalPrice", "onWayDriver", "status"],
      include: [
        {
          model: Reserve,
          where: {
            driverId: id,
          },
          attributes: ["id", "userId", "driverId", "enterpriseId", "silverPercent"],
          include: [
            {
              model: User,
              attributes: ["id", "name", "lastName"],
            },
            {
              model: Enterprise,
              attributes: ["id", "name"],
            },
          ],
        },
        {
          model: Toll
        },
        {
          model: Parking
        }
      ],
      where: {
        [Sequelize.Op.or]: [
          {
            "$Reserve.User.name$": {
              [Sequelize.Op.iLike]: `%${query}%`,
            },
          },
          {
            "$Reserve.User.last_name$": {
              [Sequelize.Op.iLike]: `%${query}%`,
            },
          },
          {
            "$Reserve.Enterprise.name$": {
              [Sequelize.Op.iLike]: `%${query}%`,
            },
          },
          Sequelize.where(
            Sequelize.cast(Sequelize.col("on_way_driver"), "varchar"),
            { [Sequelize.Op.iLike]: `%${query}%` }
          ),
          Sequelize.where(Sequelize.cast(Sequelize.col("status"), "varchar"), {
            [Sequelize.Op.iLike]: `%${query}%`,
          }),
        ],
      },
      order: [["onWayDriver", "DESC"]],
    });
  };



module.exports = {
  getAll,
  get,
  create,
  erase,
  update,
  getTripsSummary,
  getDriverMonthSummary,
  getTripsHistory,
  getTripByQuery,
  getAllDriverTrips,
  getDriverTripByQuery
};
