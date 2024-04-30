const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const camelcaseKeys = require("camelcase-keys");
const morgan = require("morgan");
const routes = require("./router.js");
require("./database.js");
const fs = require('fs');

function logError(errorMessage) {
  const logMessage = `${new Date().toISOString()} - ${errorMessage}\n`;
  fs.appendFile('./logs/error.log', logMessage, (err) => {
    if (err) {
      console.error('Error writing to error.log:', err);
    }
  });
}

// Create server & server name
const server = express();
server.name = "Silver Express API";

//Middlewares

const camelcase = () => {
  return function (req, res, next) {
    req.body = camelcaseKeys(req.body, { deep: true });
    req.params = camelcaseKeys(req.params);
    req.query = camelcaseKeys(req.query);
    next();
  };
};

server.use(bodyParser.urlencoded({ extended: true, limit: "1mb" }));
server.use(bodyParser.json({ limit: "1mb" }));
server.use(camelcase());
server.use(cookieParser());
server.use(morgan('combined', {
  skip: function (req, res) { return res.statusCode < 400 },
  stream: fs.createWriteStream(`./logs/error.log`, { flags: 'a' })
}));
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, DELETE, PATCH"
  );
  next();
});

server.use("/", routes);

server.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  logError(`
  ERROR STACK: ${err.stack},
  ERROR CODE: ${err.code},
  ERROR STATUS ${err.status},
  ERROR MESSAGE: ${err.message},
  ERROR STATUS CODE: ${err.statusCode},
  ERROR HEADERS : ${err.headers}`);
  res.status(status).send(message);
});

module.exports = server;