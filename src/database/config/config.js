require('dotenv').config();

const config = {
  production: {
    PORT: process.env.PORT || 3000,
    MONGODB_URI: process.env.MONGODB_URI,
  },
};

const env = process.env.NODE_ENV || 'production';

module.exports = config[env];
