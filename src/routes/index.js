const { Router } = require('express')
const postAuth = require('../controllers/Auth/postAuth')

// Create router
const router = Router()

// Test route
router.get('/test', (_req, res) => {
  res.send('connected')
})

router.post('/auth', postAuth)

// Exports router
module.exports = router