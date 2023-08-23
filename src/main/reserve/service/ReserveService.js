const { Reserve } = require("../../../database");

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
  silverPercent,
) => {
  await Reserve.create({
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
  return {
    created: true,
  };
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
  silverPercent,
) => {
  const reserve = await Reserve.findOne({ where: { id } });
  if(!reserve) throw new Error("Driver not exist");

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

  return {
    reserve,
  };
};

const erase = async (id) => {
  const silverCar = await Reserve.findOne({ where: { id } });
  await silverCar.destroy();
  return {
    deleted: true,
  };
};

module.exports = {getAll, get, create, erase, update};