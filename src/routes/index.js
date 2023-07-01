const { Router } = require('express')

const postAuthHandler = require('../handlers/Auth/postAuthHandler');

const userRouters = require("./UserRouters/userRouters")
const entrepiseRouters = require("./EntrepiseRouters/entrepiseRouters")
const tripRouters = require("./TripRouters/tripRouters")



// Create router
const router = Router()

router.post('/auth', postAuthHandler)

router.use('/user', userRouters)

router.use("/entrepise", entrepiseRouters)

router.use("/trip", tripRouters)


module.exports = router