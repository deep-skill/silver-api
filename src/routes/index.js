const { Router } = require('express')
const postAuth = require('../controllers/Auth/postAuth')
const getUserData = require('../controllers/User/getUserData')
const putUserData = require('../controllers/User/putUserData')

const postEnterprise = require('../controllers/Enterprise/postEnterprise')
const getEnterprise = require('../controllers/Enterprise/getEnterprise')
const putEnterprise = require('../controllers/Enterprise/putEnterprise')

const postTrip = require('../controllers/Trip/postTrip')
const getTrip = require('../controllers/Trip/getTrip')
const putTrip = require('../controllers/Trip/putTrip')

// Create router
const router = Router()

// Test route
router.get('/test', (_req, res) => {
  res.send('connected')
})

//User
router.post('/auth', postAuth)
router.put('/user/update', putUserData)
router.get('/user/get', getUserData)
//Enterprise
router.post('/enterprise/create', postEnterprise)
router.get('/enterprise/get', getEnterprise)
router.put('/enterprise/update', putEnterprise)
//Trip
router.post('/trip/create', postTrip)
router.get('/trip/get', getTrip)
router.put('/trip/update', putTrip)

// Exports router
module.exports = router