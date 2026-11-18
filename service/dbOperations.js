const { getDB } = require('./database');

const users = () => getDB().collection('users');
const posts = () => getDB().collection('posts');
const sessions = () => getDB().collection('sessions');

async function initializeDatabase() {
  await users().createIndex({ email: 1 }, { unique: true });
  await posts().createIndex({ id: 1 }, { unique: true });
  await sessions().createIndex({ token: 1 }, { unique: true });
  await sessions().createIndex(
    { expiresAt: 1 },
    { expireAfterSeconds: 0 }
  );

  console.log('Kaiwa MongoDB collections initialized');
}

module.exports = {
  users,
  posts,
  sessions,
  initializeDatabase,
};