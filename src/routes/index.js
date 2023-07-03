const { Router } = require('express')

const authHandler = require('../handlers/Auth/authHandler');

const userRouters = require("./UserRouters/userRouters")
const enterpriseRouters = require("./EnterpriseRouters/enterpriseRouters")
const tripRouters = require("./TripRouters/tripRouters")



// Create router
const router = Router()

router.post('/auth', authHandler)

router.use('/user', userRouters)

router.use("/enterprise", enterpriseRouters)

router.use("/trip", tripRouters)


module.exports = router