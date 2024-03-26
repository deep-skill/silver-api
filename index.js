require("dotenv").config();
const server = require("./src/main/app.js");
const { database } = require("./src/main/database.js");
const { API_PORT } = process.env;

database
  .sync({
    alter: true
  })
  .then(() => {
    server.listen(API_PORT, async () => {
      console.log("Silver Express API listening on port", API_PORT);
    });
  });