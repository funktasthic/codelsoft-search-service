const mongoose = require('mongoose');
require('dotenv').config();
const config = require('./config/config');

/**
 * Connects to the MongoDB database using the MONGODB_URI environment variable.
 * If the connection fails, print the error and exit with code 1.
 * @function
 * @async
 */
const connectDB = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(config.MONGODB_URI);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;
