const { Router } = require('express')

// Create router
const router = Router()

// Test route
router.get('/test', (_req, res) => {
  res.send('connected')
})

// Exports router
module.exports = router