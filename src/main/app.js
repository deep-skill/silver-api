const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const camelcaseKeys = require('camelcase-keys');
const morgan = require('morgan');
const routes = require('./router.js');
require('./database.js');

// Create server & server name
const server = express();
server.name = 'Silver Express API';

//Middlewares

const camelcase = () => {
  return function (req, res, next) {
    req.body = camelcaseKeys(req.body, {deep: true});
    req.params = camelcaseKeys(req.params);
    req.query = camelcaseKeys(req.query);
    next();
  }
}

server.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }));
server.use(bodyParser.json({ limit: '1mb' }));
server.use(camelcase());
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE'); 
  next();
});

server.use('/', routes) ;

server.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server