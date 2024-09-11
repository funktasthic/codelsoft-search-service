const mongoose = require('mongoose');
require('dotenv').config();
const config = require('./config/config');

const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI);
  } catch (err) {
    console.error('MONGODB ERROR: ', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
