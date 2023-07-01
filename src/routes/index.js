const { Router } = require('express')

const authHandler = require('../handlers/Auth/authHandler');

const userRouters = require("./UserRouters/userRouters")
const entrepiseRouters = require("./EntrepiseRouters/entrepiseRouters")
const tripRouters = require("./TripRouters/tripRouters")



// Create router
const router = Router()

router.post('/auth', authHandler)

router.use('/user', userRouters)

router.use("/entrepise", entrepiseRouters)

router.use("/trip", tripRouters)


module.exports = router