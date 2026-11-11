const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(cookieParser());

app.get('/api/health', (req, res) => {
  res.json({ message: 'Kaiwa backend is running!' });
});
const bcrypt = require('bcryptjs');
const { randomUUID } = require('crypto');

// Temporary in-memory user storage
const users = new Map();

app.post('/api/auth/create', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      typeof email !== 'string' ||
      typeof password !== 'string' ||
      !email.trim() ||
      password.length < 8
    ) {
      return res.status(400).json({
        message: 'Valid email and password of at least 8 characters required',
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    if (users.has(normalizedEmail)) {
      return res.status(409).json({
        message: 'User already exists',
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = {
      id: randomUUID(),
      email: normalizedEmail,
      passwordHash,
    };

    users.set(normalizedEmail, user);

    res.status(201).json({
      id: user.id,
      email: user.email,
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      message: 'Unable to register user',
    });
  }
});
app.use(express.static('public'));

app.listen(port, () => {
 
console.log(`Kaiwa service listening on port ${port}`);
});
