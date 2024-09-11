require('dotenv').config();

const config = {
  development: {
    PORT: process.env.PORT || 3000,
    MONGODB_URI: process.env.MONGODB_URI_DEV,
  },
  test: {
    PORT: process.env.PORT || 3000,
    MONGODB_URI: process.env.MONGODB_URI_TEST,
  },
  production: {
    PORT: process.env.PORT || 3000,
    MONGODB_URI: process.env.MONGODB_URI_PROD,
  },
};

const env = process.env.NODE_ENV || 'development';

module.exports = config[env];
