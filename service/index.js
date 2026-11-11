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
const authTokens = new Map();

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (typeof email !== 'string' || typeof password !== 'string') {
      return res.status(400).json({
        message: 'Email and password are required',
      });
    }

    const user = users.get(email.trim().toLowerCase());

    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({
        message: 'Invalid email or password',
      });
    }

    const token = randomUUID();
    authTokens.set(token, user.id);

    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    res.json({
      id: user.id,
      email: user.email,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      message: 'Unable to log in',
    });
  }
});
// Verify authentication token
function verifyAuth(req, res, next) {
  const token = req.cookies.token;
  const userId = authTokens.get(token);

  if (!userId) {
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }

  const user = [...users.values()].find(
    (user) => user.id === userId
  );

  if (!user) {
    return res.status(401).json({
      message: 'User not found',
    });
  }

  req.user = user;
  next();
}

// Get currently authenticated user
app.get('/api/auth/me', verifyAuth, (req, res) => {
  res.json({
    id: req.user.id,
    email: req.user.email,
  });
});

// Logout
app.delete('/api/auth/logout', (req, res) => {
  const token = req.cookies.token;

  authTokens.delete(token);

  res.clearCookie('token', {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  });

  res.status(204).send();
});// Temporary post storage
const posts = [];

// Retrieve all posts
app.get('/api/posts', (req, res) => {
  res.json(posts);
});

// Create a new post
app.post('/api/posts', verifyAuth, (req, res) => {
  const { title, content } = req.body;

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

  const newPost = {
    id: randomUUID(),
    title: title.trim(),
    content: content.trim(),
    author: req.user.email,
    image: '',
    likes: [],
    comments: [],
  };

  posts.unshift(newPost);

  res.status(201).json(newPost);
});

// Edit an existing post
app.put('/api/posts/:id', verifyAuth, (req, res) => {
  const post = posts.find(
    (post) => post.id === req.params.id
  );

  if (!post) {
    return res.status(404).json({
      message: 'Post not found',
    });
  }

  if (post.author !== req.user.email) {
    return res.status(403).json({
      message: 'You can only edit your own posts',
    });
  }

  const { title, content } = req.body;

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

  post.title = title.trim();
  post.content = content.trim();

  res.json(post);
});

// Delete a post
app.delete('/api/posts/:id', verifyAuth, (req, res) => {
  const index = posts.findIndex(
    (post) => post.id === req.params.id
  );

  if (index === -1) {
    return res.status(404).json({
      message: 'Post not found',
    });
  }

  if (posts[index].author !== req.user.email) {
    return res.status(403).json({
      message: 'You can only delete your own posts',
    });
  }

  posts.splice(index, 1);

  res.status(204).send();
});

// Like or unlike a post
app.post('/api/posts/:id/like', verifyAuth, (req, res) => {
  const post = posts.find(
    (post) => post.id === req.params.id
  );

  if (!post) {
    return res.status(404).json({
      message: 'Post not found',
    });
  }

  const email = req.user.email;

  if (post.likes.includes(email)) {
    post.likes = post.likes.filter(
      (user) => user !== email
    );
  } else {
    post.likes.push(email);
  }

  res.json(post);
});

// Add a comment
app.post('/api/posts/:id/comment', verifyAuth, (req, res) => {
  const post = posts.find(
    (post) => post.id === req.params.id
  );

  if (!post) {
    return res.status(404).json({
      message: 'Post not found',
    });
  }

  const { text } = req.body;

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

  post.comments.push(comment);

  res.json(post);
});

app.use(express.static('public'));

app.listen(port, () => {
 
console.log(`Kaiwa service listening on port ${port}`);
});
