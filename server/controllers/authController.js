const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUser } = require('../services/authService');

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await registerUser(username, email, password);
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({ message: 'Failed to register user' });
  }
});

// Login a user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await loginUser(email, password);
    res.status(200).json({ message: 'User logged in successfully', token });
  } catch (err) {
    console.error('Error logging in user:', err);
    res.status(401).json({ message: 'Invalid email or password' });
  }
});

// Get current user
router.get('/me', async (req, res) => {
  try {
    const user = await getUser(req.headers.authorization);
    res.status(200).json({ message: 'User fetched successfully', user });
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ message: 'Failed to fetch user' });
  }
});

module.exports = router;