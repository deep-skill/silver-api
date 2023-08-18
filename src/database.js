require('dotenv').config();
const { Sequelize } = require('sequelize');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env

// Database sequelize connection
const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
  logging: (...msg) => console.log(msg),
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
const DriverModel = require('./main/driver/model/Driver.js');
const DriverAccountModel = require('./main/driver/model/DriverAccount.js');
const CarModel = require('./main/car/model/Car.js');

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
CarModel(sequelize);

//Relations

const { Enterprise, Reserve, Driver, Trip,
  Stop, User, FinanceDriver, FinanceEnterprice,
  TollMap, Toll, Parking, Detour, Car, DriverAccount } = sequelize.models

Enterprise.hasMany(User, {foreignKey: 'enterprise_ruc', sourceKey: 'ruc', timestamps: false});
User.belongsTo(Enterprise, {foreignKey: 'enterprise_ruc', targetId: 'ruc', timestamps: false});

User.hasMany(Reserve, {foreignKey: {name: 'userId', field:'user_id'}, sourceKey: 'id', timestamps: false});
Reserve.belongsTo(User, {foreignKey: {name: 'userId', field:'user_id'}, targetId: 'id', timestamps: false});

Driver.hasMany(Reserve, {foreignKey: {name: 'driverId', field:'driver_id'}, sourceKey: 'id', timestamps: false});
Reserve.belongsTo(Driver, {foreignKey: {name: 'driverId', field:'driver_id'}, targetId: 'id', timestamps: false});

Enterprise.hasMany(Reserve, {foreignKey: {name: 'enterpriseId', field:'enterprise_id'}, sourceKey: 'id', timestamps: false});
Reserve.belongsTo(Enterprise, {foreignKey: {name: 'enterpriseId', field:'enterprise_id'}, targetId: 'id', timestamps: false});

Car.hasMany(Reserve, {foreignKey: {name: 'carId', field:'car_id'}, sourceKey: 'id', timestamps: false});
Reserve.belongsTo(Car, {foreignKey: {name: 'carId', field:'car_id'}, targetId: 'id', timestamps: false});

Reserve.hasOne(Trip, {foreignKey: 'reserve_id', sourceKey: 'id', timestamps: false});
Trip.belongsTo(Reserve, {foreignKey: 'reserve_id', sourceKey: 'id', timestamps: false});

Car.hasOne(Driver, {foreignKey: 'car_id', sourceKey: 'id', timestamps: false});
Driver.belongsTo(Car, {foreignKey: 'car_id', targetId: 'id', timestamps: false});

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
  database: sequelize
}