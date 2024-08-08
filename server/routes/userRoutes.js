const express = require('express');
const router = express.Router();
const { createUser, getUserById, updateUser, deleteUser } = require('../services/userService');

// Create a new user
router.post('/', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await createUser(username, email, password);
    res.status(201).json({ message: 'User created successfully', user });
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ message: 'Failed to create user' });
  }
});

// Get user by ID
router.get('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await getUserById(userId);
    res.status(200).json({ message: 'User fetched successfully', user });
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(404).json({ message: 'User not found' });
  }
});

// Update a user
router.put('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const { username, email, password } = req.body;
    const user = await updateUser(userId, username, email, password);
    res.status(200).json({ message: 'User updated successfully', user });
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ message: 'Failed to update user' });
  }
});

// Delete a user
router.delete('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    await deleteUser(userId);
    res.status(204).json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ message: 'Failed to delete user' });
  }
});

module.exports = router;