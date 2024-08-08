const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/env.config');

const registerUser = async (username, email, password) => {
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET);

    return {
      user: newUser,
      token,
    };
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

const loginUser = async (email, password) => {
  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid email or password');
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET);

    return token;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
};

const getUser = async (token) => {
  try {
    // Verify JWT token
    const decoded = jwt.verify(token.split(' ')[1], JWT_SECRET);

    // Find user by ID
    const user = await User.findById(decoded.userId);

    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
};