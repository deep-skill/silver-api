const { Router } = require('express');

const authHandler = require('../handlers/Auth/authHandler');

const { auth } = require('express-oauth2-jwt-bearer');

const userRouter = require('./UserRouter/userRouter');
const enterpriseRouter = require('./EnterpriseRouter/enterpriseRouter');
const driverRouter = require('./DriverRouter/driverRouter');
const reserveRouter = require('./ReserveRouter/reserveRouter');
const tripRouter = require('./TripRouter/tripRouter');

const jwtCheck = auth({
  audience: 'http://localhost:5000',
  issuerBaseURL: 'https://dev-4aecm50nap6pl2q5.us.auth0.com/',
  tokenSigningAlg: 'RS256'
});

// Create router
const router = Router();

router.get('/', (req, res) => {
  res.status(200).send('Hi! Home');
});
/* router.get('/', jwtCheck, (req, res) => {
  res.status(200).send('Hi! Home');
}); */

router.use('/enterprise', enterpriseRouter);
router.use('/user', userRouter);
router.use('/driver', driverRouter);
router.use('/reserve', reserveRouter);
router.use('/trip', tripRouter);
router.post('/auth', authHandler);

module.exports = router;