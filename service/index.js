
const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const { randomUUID } = require('crypto');
const path = require('path');

const { connectDB } = require('./database');
const {
  users,
  posts,
  sessions,
  initializeDatabase,
} = require('./dbOperations');

const app = express();
const port = process.argv[2] || 4000;
const sessionDuration = 7 * 24 * 60 * 60 * 1000;

app.use(express.json());
app.use(cookieParser());

const cookieOptions = {
  httpOnly: true,
  sameSite: 'strict',
  secure: process.env.NODE_ENV === 'production',
  maxAge: sessionDuration,
};

function publicUser(user) {
  return { id: user.id, email: user.email };
}

function publicPost(post) {
  if (!post) return null;
  const { _id, ...result } = post;
  return result;
}

// Check whether a user is logged in
async function verifyAuth(req, res, next) {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }

    const session = await sessions().findOne({
      token,
      expiresAt: { $gt: new Date() },
    });

    if (!session) {
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }

    const user = await users().findOne({
      id: session.userId,
    });

    if (!user) {
      return res.status(401).json({
        message: 'User not found',
      });
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    message: 'Kaiwa backend is running!',
  });
});

// Register a new user
app.post('/api/auth/create', async (req, res, next) => {
  try {
    const { email, password } = req.body || {};

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

    const user = {
      id: randomUUID(),
      email: normalizedEmail,
      passwordHash: await bcrypt.hash(password, 10),
    };

    try {
      await users().insertOne(user);
    } catch (error) {
      if (error.code === 11000) {
        return res.status(409).json({
          message: 'User already exists',
        });
      }
      throw error;
    }

    res.status(201).json(publicUser(user));
  } catch (error) {
    next(error);
  }
});

// Login
app.post('/api/auth/login', async (req, res, next) => {
  try {
    const { email, password } = req.body || {};

    if (
      typeof email !== 'string' ||
      typeof password !== 'string'
    ) {
      return res.status(400).json({
        message: 'Email and password are required',
      });
    }

    const user = await users().findOne({
      email: email.trim().toLowerCase(),
    });

    if (
      !user ||
      !(await bcrypt.compare(password, user.passwordHash))
    ) {
      return res.status(401).json({
        message: 'Invalid email or password',
      });
    }

    const token = randomUUID();

    await sessions().insertOne({
      token,
      userId: user.id,
      expiresAt: new Date(Date.now() + sessionDuration),
    });

    res.cookie('token', token, cookieOptions);
    res.json(publicUser(user));
  } catch (error) {
    next(error);
  }
});

// Get currently logged-in user
app.get('/api/auth/me', verifyAuth, (req, res) => {
  res.json(publicUser(req.user));
});

// Logout
app.delete('/api/auth/logout', async (req, res, next) => {
  try {
    if (req.cookies.token) {
      await sessions().deleteOne({
        token: req.cookies.token,
      });
    }

    res.clearCookie('token', {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    });

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

// Retrieve all posts
app.get('/api/posts', async (req, res, next) => {
  try {
    const results = await posts()
      .find()
      .sort({ _id: -1 })
      .toArray();

    res.json(results.map(publicPost));
  } catch (error) {
    next(error);
  }
});

// Create a post
app.post('/api/posts', verifyAuth, async (req, res, next) => {
  try {
    const { title, content } = req.body || {};

    if (
      typeof title !== 'string' ||
      typeof content !== 'string' ||
      !title.trim() ||
      !content.trim()
    ) {
      return res.status(400).json({
        message: 'Title and content are required',
      });
    }

    const post = {
      id: randomUUID(),
      title: title.trim(),
      content: content.trim(),
      author: req.user.email,
      image: '',
      likes: [],
      comments: [],
      createdAt: new Date(),
    };

    await posts().insertOne(post);

    res.status(201).json(publicPost(post));
  } catch (error) {
    next(error);
  }
});

// Edit an existing post
app.put('/api/posts/:id', verifyAuth, async (req, res, next) => {
  try {
    const { title, content } = req.body || {};

    if (
      typeof title !== 'string' ||
      typeof content !== 'string' ||
      !title.trim() ||
      !content.trim()
    ) {
      return res.status(400).json({
        message: 'Title and content are required',
      });
    }

    const result = await posts().findOneAndUpdate(
      {
        id: req.params.id,
        author: req.user.email,
      },
      {
        $set: {
          title: title.trim(),
          content: content.trim(),
        },
      },
      { returnDocument: 'after' }
    );

    if (!result) {
      const exists = await posts().findOne({
        id: req.params.id,
      });

      return res.status(exists ? 403 : 404).json({
        message: exists
          ? 'You can only edit your own posts'
          : 'Post not found',
      });
    }

    res.json(publicPost(result));
  } catch (error) {
    next(error);
  }
});

// Delete a post
app.delete('/api/posts/:id', verifyAuth, async (req, res, next) => {
  try {
    const result = await posts().deleteOne({
      id: req.params.id,
      author: req.user.email,
    });

    if (!result.deletedCount) {
      const exists = await posts().findOne({
        id: req.params.id,
      });

      return res.status(exists ? 403 : 404).json({
        message: exists
          ? 'You can only delete your own posts'
          : 'Post not found',
      });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

// Like or unlike a post
app.post('/api/posts/:id/like', verifyAuth, async (req, res, next) => {
  try {
    const email = req.user.email;
    const filter = { id: req.params.id };

    const unlike = await posts().findOneAndUpdate(
      { ...filter, likes: email },
      { $pull: { likes: email } },
      { returnDocument: 'after' }
    );

    if (unlike) {
      return res.json(publicPost(unlike));
    }

    const liked = await posts().findOneAndUpdate(
      { ...filter, likes: { $ne: email } },
      { $addToSet: { likes: email } },
      { returnDocument: 'after' }
    );

    if (!liked) {
      return res.status(404).json({
        message: 'Post not found',
      });
    }

    res.json(publicPost(liked));
  } catch (error) {
    next(error);
  }
});

// Add a comment
app.post('/api/posts/:id/comment', verifyAuth, async (req, res, next) => {
  try {
    const { text } = req.body || {};

    if (typeof text !== 'string' || !text.trim()) {
      return res.status(400).json({
        message: 'Comment cannot be empty',
      });
    }

    const comment = {
      id: randomUUID(),
      author: req.user.email,
      text: text.trim(),
    };

    const result = await posts().findOneAndUpdate(
      { id: req.params.id },
      { $push: { comments: comment } },
      { returnDocument: 'after' }
    );

    if (!result) {
      return res.status(404).json({
        message: 'Post not found',
      });
    }

    res.json(publicPost(result));
  } catch (error) {
    next(error);
  }
});

// Serve React production files
const publicPath = path.join(__dirname, 'public');

app.use(express.static(publicPath));

app.get('/{*path}', (req, res, next) => {
  if (req.path.startsWith('/api/')) {
    return next();
  }

  res.sendFile(path.join(publicPath, 'index.html'));
});

// Handle errors
app.use((error, req, res, next) => {
  console.error('Kaiwa service error:', error);

  if (res.headersSent) {
    return next(error);
  }

  res.status(500).json({
    message: 'Internal server error',
  });
});

// Connect to MongoDB before starting server
async function startServer() {
  await connectDB();
  await initializeDatabase();

  app.listen(port, () => {
    console.log(`Kaiwa service listening on port ${port}`);
  });
}

startServer().catch((error) => {
  console.error('Unable to start Kaiwa:', error.message);
  process.exit(1);
});
