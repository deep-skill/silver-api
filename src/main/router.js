const {Router} = require('express');

const userController = require('../main/user/controller/UserController');
const enterpriseController = require('../main/enterprise/controller/EnterpriseController');
const driverController = require('../main/driver/controller/DriverController');
const reserveController = require('../main/reserve/controller/ReserveController');
const tripController = require('../main/trip/controller/TripController');
const carController = require('../main/car/controller/CarController');
const parkingController = require('../main/parking/controller/ParkingController');
const observationController = require('../main/observation/controller/ObservationController');
const stopController = require('../main/stop/controller/StopController');
const tollController = require('../main/toll/controller/TollController');

const router = Router();

router.use('/silver-api/enterprises', enterpriseController);
router.use('/silver-api/users', userController);
router.use('/silver-api/drivers', driverController);
router.use('/silver-api/reserves', reserveController);
router.use('/silver-api/trips', tripController);
router.use('/silver-api/cars', carController);
router.use('/silver-api/parkings', parkingController);
router.use('/silver-api/observations', observationController);
router.use('/silver-api/stops', stopController);
router.use('/silver-api/tolls', tollController);

module.exports = router;