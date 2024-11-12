const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/gameTracking', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

// Replace the in-memory users array with MongoDB logic
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Username and password validation (same as before)
  if (username.length <= 1) {
    return res.status(400).json({ error: 'Username must be more than 1 character.' });
  }

  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  if (!passwordPattern.test(password)) {
    return res.status(400).json({
      error: 'Password must be at least 8 characters long and include 1 uppercase letter, 1 lowercase letter, and 1 digit.',
    });
  }

  // Save user to MongoDB
  const newUser = new User({ username, password });
  await newUser.save();

  return res.status(200).json({ message: 'Registration successful!' });
});
