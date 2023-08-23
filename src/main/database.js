require('dotenv').config();
const { Sequelize } = require('sequelize');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env

// Database sequelize connection
const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
  logging: (...msg) => console.log(msg),
  native: false
});

// Imports models
const EnterpriseModel = require('./enterprise/model/Enterprise.js');
const ReserveModel = require('./reserve/model/Reserve.js');
const TripModel = require('./trip/model/Trip.js');
const StopModel = require('../models/Stop.js');
const UserModel = require('./user/model/User.js');
const FinanceDriverModel = require('../models/FinanceDriver.js');
const FinanceEnterpriceModel = require('../models/FinanceEnterprice.js');
const TollMapModel = require('../models/TollMap.js');
const TollModel = require('../models/Toll.js');
const ParkingModel = require('../models/Parking.js');
const DetourModel = require('../models/Detour.js');
const DriverModel = require('./driver/model/Driver.js');
const DriverAccountModel = require('./driver/model/DriverAccount.js');
const CarModel = require('./car/model/Car.js');


// Create sequelize models
EnterpriseModel(sequelize);
ReserveModel(sequelize);
DriverModel(sequelize);
DriverAccountModel(sequelize);
TripModel(sequelize);
StopModel(sequelize);
UserModel(sequelize);
FinanceDriverModel(sequelize);
FinanceEnterpriceModel(sequelize);
TollMapModel(sequelize);
TollModel(sequelize);
ParkingModel(sequelize);
DetourModel(sequelize);
CarModel(sequelize);

//Relations

const { Enterprise, Reserve, Driver, Trip,
  Stop, User, FinanceDriver, FinanceEnterprice,
  TollMap, Toll, Parking, Detour, Car, DriverAccount } = sequelize.models

Enterprise.hasMany(User, {foreignKey: {name: 'enterpriseId', field:'enterprise_id'}, sourceKey: 'id', timestamps: false});
User.belongsTo(Enterprise, {foreignKey: {name: 'enterpriseId', field:'enterprise_id'}, targetId: 'id', timestamps: false});

User.hasMany(Reserve, {foreignKey: {name: 'userId', field:'user_id'}, sourceKey: 'id', timestamps: false});
Reserve.belongsTo(User, {foreignKey: {name: 'userId', field:'user_id'}, targetId: 'id', timestamps: false});

Driver.hasMany(Reserve, {foreignKey: {name: 'driverId', field:'driver_id'}, sourceKey: 'id', timestamps: false});
Reserve.belongsTo(Driver, {foreignKey: {name: 'driverId', field:'driver_id'}, targetId: 'id', timestamps: false});

Enterprise.hasMany(Reserve, {foreignKey: {name: 'enterpriseId', field:'enterprise_id'}, sourceKey: 'id', timestamps: false});
Reserve.belongsTo(Enterprise, {foreignKey: {name: 'enterpriseId', field:'enterprise_id'}, targetId: 'id', timestamps: false});

Car.hasMany(Reserve, {foreignKey: {name: 'carId', field:'car_id'}, sourceKey: 'id', timestamps: false});
Reserve.belongsTo(Car, {foreignKey: {name: 'carId', field:'car_id'}, targetId: 'id', timestamps: false});

Reserve.hasOne(Trip, {foreignKey: {name: 'reserveId', field:'reserve_id'}, sourceKey: 'id', timestamps: false});
Trip.belongsTo(Reserve, {foreignKey: {name: 'reserveId', field:'reserve_id'}, targetId: 'id', timestamps: false});

Car.hasOne(Driver, {foreignKey: { name: 'carId', field: 'car_id'}, sourceKey: 'id', timestamps: false});
Driver.belongsTo(Car, {foreignKey: { name: 'carId', field: 'car_id'}, targetId: 'id', timestamps: false});

DriverAccount.hasOne(Driver, {foreignKey: { name: 'driverAccountId', field: 'driver_account_id'}, sourceKey: 'id', timestamps: false});
Driver.belongsTo(DriverAccount, {foreignKey: { name: 'driverAccountId', field: 'driver_account_id'}, targetId: 'id', timestamps: false});

module.exports = {
  Enterprise,
  Reserve,
  Driver,
  Trip,
  Stop,
  User,
  FinanceDriver,
  FinanceEnterprice,
  TollMap,
  Toll,
  Parking,
  Detour,
  Car,
  DriverAccount,
  database: sequelize
}