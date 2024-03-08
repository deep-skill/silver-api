require("dotenv").config();
const server = require("./src/main/app.js");
const {
  database,
  Enterprise,
  User,
  Driver,
  SilverCar,
  Car,
  Reserve,
  DriverAccount,
  Trip,
} = require("./src/main/database.js");
const { PORT, ENVIRONMENT } = process.env;

// Bulk
const enterpriseBulk = require("./src/assets/bulks/enterpriseBulk.json");
const userBulk = require("./src/assets/bulks/userBulk.json");
const driverBulk = require("./src/assets/bulks/driverBulk.json");
const carBulk = require("./src/assets/bulks/carBulk.json");
const reserveBulk = require("./src/assets/bulks/reserveBulk.json");
const driverAccountBulk = require("./src/assets/bulks/driverAccountBulk.json");
const tripBulk = require("./src/assets/bulks/tripBulk.json");

// Syncs sequelize models & starts server
database
  .sync({
    force: ENVIRONMENT == "dev" ? true : false,
  })
  .then(() => {
    server.listen(PORT, async () => {
      const enterprises = await Enterprise.findAll();
      if (!enterprises.length) {
        let bulk = enterpriseBulk.map((e) => {
          return {
            ruc: e.ruc,
            name: e.name,
            address: e.address,
          };
        });
        await Enterprise.bulkCreate(bulk);
        console.log("Enterprise bulk created");
      }

      const users = await User.findAll();
      if (!users.length) {
        let bulk = userBulk.map((e) => {
          return {
            role: e.role,
            name: e.name,
            lastName: e.last_name,
            dni: e.dni,
            ruc: e.ruc,
            phoneNumber: e.phone_number,
            email: e.email,
            address: e.address,
            enterpriseId: e.enterprise_id,
          };
        });
        await User.bulkCreate(bulk);
        console.log("User bulk created");
      }

      const cars = await Car.findAll();
      if (!cars.length) {
        let bulk = carBulk.map((e) => {
          return {
            licensePlate: e.license_plate,
            owner: e.owner,
            brand: e.brand,
            model: e.model,
            type: e.type,
            color: e.color,
            year: e.year,
          };
        });
        await Car.bulkCreate(bulk);
        console.log("Car bulk created");
      }

      const driverAccounts = await DriverAccount.findAll();
      if (!driverAccounts.length) {
        let bulk = driverAccountBulk.map((e) => {
          return {
            bankName: e.bank_name,
            bankAccountType: e.bank_account_type,
            bankAccount: e.bank_account,
            cci: e.cci,
          };
        });
        await DriverAccount.bulkCreate(bulk);
        console.log("Driver Account bulk created");
      }

      const drivers = await Driver.findAll();
      if (!drivers.length) {
        let bulk = driverBulk.map((e) => {
          return {
            carId: e.car_id ? e.car_id : null,
            driverAccountId: e.driver_account_id ? e.driver_account_id : null,
            name: e.name,
            lastName: e.last_name,
            dni: e.dni,
            ruc: e.ruc,
            licenseNumber: e.license_number,
            phoneNumber: e.phone_number,
            email: e.email,
            address: e.address,
            bankName: e.bank_name,
            bankAccountType: e.bank_account_type,
            bankAccount: e.bank_account,
            imageUrl: e.image_url,
          };
        });
        await Driver.bulkCreate(bulk);
        console.log("Driver bulk created");
      }

      if (ENVIRONMENT == "dev") {
        const reserves = await Reserve.findAll();
        if (!reserves.length) {
          let bulk = reserveBulk.map((e) => {
            return {
              userId: e.user_id,
              driverId: e.driver_id,
              enterpriseId: e.enterprise_id ? e.enterprise_id : null,
              carId: e.car_id ? e.car_id : null,
              tripType: e.trip_type,
              serviceType: e.service_type,
              serviceCarType: e.service_car_type,
              startTime: e.start_time,
              startAddress: e.start_address,
              startAddressLat: e.start_address_lat,
              startAddressLon: e.start_address_lon,
              endAddress: e.end_address,
              endAddressLat: e.end_address_lat,
              endAddressLon: e.end_address_lon,
              suggestedPrice: e.suggested_price,
              price: e.price,
              driverPercent: e.driver_percent,
              silverPercent: e.silver_percent,
            };
          });
          await Reserve.bulkCreate(bulk);
          console.log("Reserve bulk created");
        }
        const trips = await Trip.findAll();
        if (!trips.length) {
          let bulk = tripBulk.map((e) => {
            return {
              reserveId: e.reserve_id,
              totalPrice: e.total_price,
              onWayDriver: e.on_way_driver,
              status: e.status,
            };
          });
          await Trip.bulkCreate(bulk);
          console.log("Trip bulk created");
        }
      }

      console.log("Silver Express listening on port", PORT);
    });
  });
