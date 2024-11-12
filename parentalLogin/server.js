const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const app = express();
const port = 5000;

// Dummy database for demonstration purposes
const parentUsers = [
  { username: 'parent1', password: '$2b$10$Nfj9.ZzXOyqlfCVw.gpD5OWb2jj3d89eH5FZ32tdwHvdyxNdfmdKa' } // password: 'Password123'
];

app.use(bodyParser.json());

// Parent Login Route
app.post('/parent/login', (req, res) => {
  const { username, password } = req.body;
  const parent = parentUsers.find((user) => user.username === username);

  if (!parent) {
    return res.status(401).json({ error: 'User not found' });
  }

  bcrypt.compare(password, parent.password, (err, isMatch) => {
    if (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    res.status(200).json({ message: 'Login successful' });
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
