const { Router } = require('express')
const postAuth = require('../controllers/Auth/postAuth')
const putUserData = require('../controllers/User/putUserData')
const postEnterprise = require('../controllers/Enterprise/postEnterprise')

// Create router
const router = Router()

// Test route
router.get('/test', (_req, res) => {
  res.send('connected')
})

//Auth new user
router.post('/auth', postAuth)
//Update user data
router.put('/user/update', putUserData)
//Create enterprise
router.post('/enterprise/create', postEnterprise)

// Exports router
module.exports = router