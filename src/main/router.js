const {Router} = require('express');

const {auth} = require('express-oauth2-jwt-bearer');

const userController = require('../main/user/controller/UserController');
const enterpriseController = require('../main/enterprise/controller/EnterpriseController');
const driverController = require('../main/driver/controller/DriverController');
const reserveController = require('../main/reserve/controller/ReserveController');
const tripController = require('../main/trip/controller/TripController');
const carController = require('../main/car/controller/CarController');

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

router.use('/silver-api/enterprises', enterpriseController);
router.use('/silver-api/users', userController);
router.use('/silver-api/drivers', driverController);
router.use('/silver-api/reserves', reserveController);
router.use('/silver-api/trips', tripController);
router.use('/silver-api/cars', carController);
router.use('/silver-api/parkings', parkingController);
router.use('/silver-api/observation', observationController);
router.use('/silver-api/stops', stopController);
router.use('/silver-api/tolls', tollController);

module.exports = router;