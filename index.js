require('dotenv').config();
const server = require('./src/index.js');
const { database, Enterprise, User, Driver } = require('./src/database.js');
const { PORT } = process.env;

// Bulk
const enterpriseBulk = require('./src/assets/bulks/enterpriseBulk.json');
const userBulk = require('./src/assets/bulks/userBulk.json');
const driverBulk = require('./src/assets/bulks/driverBulk.json');

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
    const drivers = Driver.findAll();
    if(!drivers.length){
      let bulk = driverBulk.map((e) => {
        return {
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
          car_brand: e.car_brand,
          car_model: e.car_model,
          car_year: e.car_year,
          rating: [] 
        }
      });
      await Driver.bulkCreate(bulk);
      console.log('Driver bulk created');
    };

    console.log('Silver Express listening at port', PORT);
  });
});
