// Import necessary modules
const express = require('express')
const router = express.Router()

// Middleware to check if user is authenticated
router.get('/checkAuth', (req, res) => {
  console.log("this is the req of the check auth", req);
  if (req.session && req.session.email) {
    return res.json({
      authenticated: true,
      email: req.session.email,
    })
  } else {
    console.log('authenticated : failed hhh ')
    return res.json({ authenticated: false })
  }


})

module.exports = router
