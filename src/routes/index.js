const { Router } = require('express')

const authHandler = require('../handlers/Auth/authHandler');

const { auth } = require('express-oauth2-jwt-bearer');

const userRouters = require("./UserRouters/userRouters")
const enterpriseRouters = require("./EnterpriseRouters/enterpriseRouters")
const tripRouters = require("./TripRouters/tripRouters")

const jwtCheck = auth({
  audience: 'http://localhost:5000',
  issuerBaseURL: 'https://dev-4aecm50nap6pl2q5.us.auth0.com/',
  tokenSigningAlg: 'RS256'
});


// Create router
const router = Router()

router.get("/", jwtCheck, (req, res) => {
  res.status(200).send('Hi! Home');
});

router.use('/user', userRouters);

router.post('/auth', authHandler)


router.use("/enterprise", enterpriseRouters)

router.use("/trip", tripRouters)


module.exports = router