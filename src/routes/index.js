const { Router } = require('express')
const postAuth = require('../controllers/Auth/postAuth')
const getUserData = require('../controllers/User/getUserData')
const putUserData = require('../controllers/User/putUserData')
const postEnterprise = require('../controllers/Enterprise/postEnterprise')
const getEnterprise = require('../controllers/Enterprise/getEnterprise')
const postTrip = require('../controllers/Trip/postTrip')

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
//Trip
router.post('/trip/create', postTrip)

// Exports router
module.exports = router