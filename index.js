require('dotenv').config();
const server = require('./src/app.js');
const { database, Enterprise, User, Driver, SilverCar, Car, Reserve } = require('./src/database.js');
const { PORT } = process.env;

// Bulk
const enterpriseBulk = require('./src/assets/bulks/enterpriseBulk.json');
const userBulk = require('./src/assets/bulks/userBulk.json');
const driverBulk = require('./src/assets/bulks/driverBulk.json');
const silverCarBulk = require('./src/assets/bulks/silverCarBulk.json');
const carBulk = require('./src/assets/bulks/carBulk.json');
const reserveBulk = require('./src/assets/bulks/reserveBulk.json');

// Syncs sequelize models & starts server
database.sync({ force: true }).then(() => {
  server.listen(PORT, async () => {

    const enterprises = Enterprise.findAll();
    if(!enterprises.length){
      let bulk = enterpriseBulk.map((e) => {
        return {
          ruc: e.ruc,
          name: e.name,
          address: e.address
        }
      });
      await Enterprise.bulkCreate(bulk);
      console.log('Enterprise bulk created');
    };

    const users = User.findAll();
    if(!users.length){
      let bulk = userBulk.map((e) => {
        return {
          role: e.role,
          name: e.name,
          last_name: e.last_name,
          dni: e.dni,
          ruc: e.ruc,
          phone_number: e.phone_number,
          email: e.email,
          address: e.address,
          enterprise_ruc: e.enterprise_ruc
        }
      });
      await User.bulkCreate(bulk);
      console.log('User bulk created');
    };

    const cars = Car.findAll();
    if(!cars.length){
      let bulk = carBulk.map((e) => {
        return {
          license_plate: e.license_plate,
          brand: e.brand,
          model: e.model,
          type: e.type,
          color: e.color,
          year: e.year
        }
      });
      await Car.bulkCreate(bulk);
      console.log('Car bulk created');
    };

    const drivers = Driver.findAll();
    if(!drivers.length){
      let bulk = driverBulk.map((e) => {
        return {
          car_id: e.car_id ? (e.car_id) : null,
          name: e.name,
          last_name: e.last_name,
          dni: e.dni,
          ruc: e.ruc,
          license_number: e.license_number,
          phone_number: e.phone_number,
          email: e.email,
          address: e.address,
          bank_name: e.bank_name,
          bank_account_type: e.bank_account_type,
          bank_account: e.bank_account,
          rating: [] 
        }
      });
      await Driver.bulkCreate(bulk);
      console.log('Driver bulk created');
    };

    const silverCars = SilverCar.findAll();
    if(!silverCars.length){
      let bulk = silverCarBulk.map((e) => {
        return {
          license_plate: e.license_plate,
          brand: e.brand,
          model: e.model,
          type: e.type,
          color: e.color,
          year: e.year
        }
      });
      await SilverCar.bulkCreate(bulk);
      console.log('Silver Car bulk created');
    };


    
    const reserves = Reserve.findAll();
    if(!reserves.length){
      let bulk = reserveBulk.map((e) => {
        return {
          user_id: e.user_id,
          driver_id: e.driver_id,
          enterprise_ruc: e.enterprise_ruc,
          silver_car_id: e.silver_car_id ? (e.silver_car_id) : null,
          trip_type: e.trip_type,
          start_time: e.start_time,
          start_address: e.start_address,
          end_address: e.end_address,
          price: e.price,
          driver_percent: e.driver_percent
        }
      });
      await Reserve.bulkCreate(bulk);
      console.log('Reserve bulk created');
    };

    console.log('Silver Express listening on port', PORT);
  });
});
