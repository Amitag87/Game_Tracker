const express = require('express');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// Create a new router for parental authentication
const router = express.Router();

// Parent model
const Parent = mongoose.model('Parent', new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}));

// Register a new parent
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Validate input
  if (username.length <= 1) {
    return res.status(400).json({ error: 'Username must be more than 1 character' });
  }

  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  if (!passwordPattern.test(password)) {
    return res.status(400).json({ error: 'Password must be at least 8 characters long and include 1 uppercase letter, 1 lowercase letter, and 1 digit.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const parent = new Parent({ username, password: hashedPassword });
    await parent.save();
    res.status(201).json({ message: 'Parent registered successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while registering. Please try again.' });
  }
});

// Login for parent
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const parent = await Parent.findOne({ username });
    if (!parent) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, parent.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: parent._id }, 'secret_key', { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while logging in. Please try again.' });
  }
});

module.exports = router;
