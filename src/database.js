require('dotenv').config();
const { Sequelize } = require('sequelize');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env

// Database sequelize connection
const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
  logging: false,
  native: false
});

// Imports models
const EnterpriseModel = require('./models/Enterprise.js');
const ReserveModel = require('./models/Reserve.js');
const DriverModel = require('./models/Driver.js');
const TripModel = require('./models/Trip.js');
const StopModel = require('./models/Stop.js');
const UserModel = require('./models/User.js');
const FinanceDriverModel = require('./models/FinanceDriver.js');
const FinanceEnterpriceModel = require('./models/FinanceEnterprice.js');
const TollMapModel = require('./models/TollMap.js');
const TollModel = require('./models/Toll.js');
const ParkingModel = require('./models/Parking.js');
const DetourModel = require('./models/Detour.js');

// Create sequelize models
EnterpriseModel(sequelize);
ReserveModel(sequelize);
DriverModel(sequelize);
TripModel(sequelize);
StopModel(sequelize);
UserModel(sequelize);
FinanceDriverModel(sequelize);
FinanceEnterpriceModel(sequelize);
TollMapModel(sequelize);
TollModel(sequelize);
ParkingModel(sequelize);
DetourModel(sequelize);

// Create database relations
const { Enterprise, Reserve, Driver, Trip, Stop, User, FinanceDriver, FinanceEnterprice, TollMap, Toll, Parking, Detour } = sequelize.models

//Relations
Enterprise.hasMany(User, {foreignKey: 'enterprise_ruc', sourceKey: 'ruc', timestamps: false});
User.belongsTo(Enterprise, {foreignKey: 'enterprise_ruc', targetId: 'ruc', timestamps: false});


// Exports sequelize models & sequelize database connection
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
  database: sequelize
}