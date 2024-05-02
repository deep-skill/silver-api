const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const camelcaseKeys = require("camelcase-keys");
const morgan = require("morgan");
const routes = require("./router.js");
require("./database.js");
const fs = require('fs');
const logError = require('./utils/logError.js')

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

morgan.token('id', function setId (req) {
  return req.id;
})
morgan.token('detail', function setDetail (req) {
  return req.detail;
});

server.use(morgan(':id :method :status :url :response-time :detail', {
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
  const stack = err.stack || err;
  const code = err.code || err;
  const status = err.status || 500;
  const message = err.message || err;
  const statusCode = err.statusCode || err;
  const headers = err.headers || err;
  logError(`
  ERROR STACK: ${stack},
  ERROR CODE: ${code},
  ERROR STATUS ${status},
  ERROR MESSAGE: ${message},
  ERROR STATUS CODE: ${statusCode},
  ERROR HEADERS : ${headers}`);
  res.status(status).send(message);
});

module.exports = server;