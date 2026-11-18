const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const client = new MongoClient(config.connectionString);

let database;

async function connectDB() {
  await client.connect();
  database = client.db('kaiwa');
  console.log('Connected to MongoDB Atlas');
  return database;
}

function getDB() {
  if (!database) {
    throw new Error('Database has not been connected');
  }
  return database;
}

module.exports = { connectDB, getDB };