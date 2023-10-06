const { Trip, Reserve } = require("../../database");

const getAll = async () => {
  return Trip.findAll();
};

const get = async (id) => {
  return Trip.findOne({ where: { id } });
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
  const totalPrice = await Trip.findAll({
    attributes: ["id", "totalPrice"],
    include: [
      {
        model: Reserve,
        attributes: ["silverPercent"],
      },
    ],
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

module.exports = { getAll, get, create, erase, update, getTripsSummary };