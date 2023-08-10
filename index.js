require('dotenv').config();
const server = require('./src/index.js');
const { database } = require('./src/database.js');
const { PORT } = process.env;

// Syncs sequelize models & starts server
database.sync({ force: true }).then(() => {
  server.listen(PORT, () => {
    console.log('Silver Express listening at port', PORT)
  });
});
