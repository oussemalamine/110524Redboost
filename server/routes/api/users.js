const express = require('express')
const router = express.Router()
const UserModel = require('../../database/models/AdminSchema')
router.post('/loadCurrentUser', async (req, res) => {
  try {
    // Retrieve email from request body instead of query parameters
    const { email } = req.body

    // Query the database to get the user with the specified email
    const user = await UserModel.findOne({ email })

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    res.status(200).json(user)
  } catch (error) {
    console.error('Error getting user:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})
router.post('/loadUsers', async (req, res) => {
  try {
    // Fetch users from the database
    const users = await UserModel.find({}, { password: 0, confirmation: 0 })

    // Exclude password and confirmation fields from the users
    const usersDataWithoutPassword = users.map((user) => {
      return {
        _id: user._id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        role: user.role,
        department: user.department,
      }
    })

    // Respond with the users
    res.status(200).json(usersDataWithoutPassword)
  } catch (error) {
    console.error('Error loading users:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

module.exports = router
