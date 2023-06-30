const { Router } = require('express')
const postAuth = require('../controllers/Auth/postAuth')
const getUserData = require('../controllers/User/getUserData')
const putUserData = require('../controllers/User/putUserData')
const statusUserData = require('../controllers/User/statusUserData')

const postEnterprise = require('../controllers/Enterprise/postEnterprise')
const getEnterprise = require('../controllers/Enterprise/getEnterprise')
const putEnterprise = require('../controllers/Enterprise/putEnterprise')
const statusEnterprise = require('../controllers/Enterprise/statusEnterprise')

const postTrip = require('../controllers/Trip/postTrip')
const getTrip = require('../controllers/Trip/getTrip')
const putTrip = require('../controllers/Trip/putTrip')
const statusTrip = require('../controllers/Trip/statusTrip')

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
router.put('/user/status', statusUserData)
//Enterprise
router.post('/enterprise/create', postEnterprise)
router.get('/enterprise/get', getEnterprise)
router.put('/enterprise/update', putEnterprise)
router.put('/enterprise/status', statusEnterprise)
//Trip
router.post('/trip/create', postTrip)
router.get('/trip/get', getTrip)
router.put('/trip/update', putTrip)
router.put('/trip/status', statusTrip)

// Exports router
module.exports = router