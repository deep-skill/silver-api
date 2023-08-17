const { Router } = require('express');

const { auth } = require('express-oauth2-jwt-bearer');

const userRouter = require('./UserRouter/userRouter');
const enterpriseRouter = require('./EnterpriseRouter/enterpriseRouter');
const driverRouter = require('./DriverRouter/driverRouter');
const reserveRouter = require('./ReserveRouter/reserveRouter');
const tripRouter = require('./TripRouter/tripRouter');
const silverCarRouter = require('./SilverCarRouter/silverCarRouter');
const carRouter = require('./CarRouter/carRouter');

const jwtCheck = auth({
  audience: 'http://localhost:5000',
  issuerBaseURL: 'https://dev-4aecm50nap6pl2q5.us.auth0.com/',
  tokenSigningAlg: 'RS256'
});

const router = Router();

router.get('/', (req, res) => {
  res.status(200).send('Hi! Home');
});
/* router.get('/', jwtCheck, (req, res) => {
  res.status(200).send('Hi! Home');
}); */

router.use('/enterprises', enterpriseRouter);
router.use('/users', userRouter);
router.use('/drivers', driverRouter);
router.use('/reserves', reserveRouter);
router.use('/trips', tripRouter);
router.use('/silver-cars', silverCarRouter);
router.use('/cars', carRouter);

module.exports = router;