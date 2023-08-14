const { Router } = require("express");

const {
  getDriversHandler,
  postDriverHandler,
  getDriverByIdHandler,
  putDriverHandler,
  deleteDriverHandler,
} = require("../../handlers/Driver/driverHandler");

const { auth } = require('express-oauth2-jwt-bearer');
const jwtCheck = auth({
  audience: 'http://localhost:5000',
  issuerBaseURL: 'https://dev-4aecm50nap6pl2q5.us.auth0.com/',
  tokenSigningAlg: 'RS256'
});

const driverRouter = Router();

/* driverRouter.get("/", jwtCheck, getDriversHandler); */
driverRouter.get('/', getDriversHandler);
driverRouter.post('/', postDriverHandler);
driverRouter.get('/:id', getDriverByIdHandler);
driverRouter.put('/', putDriverHandler);
driverRouter.delete('/', deleteDriverHandler);

module.exports = driverRouter;