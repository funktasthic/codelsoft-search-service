const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const db = require('../database/connection');
const config = require('../database/config/config');
const env = process.env.NODE_ENV;

class Server {
  constructor() {
    this.app = express();
    this.port = config.PORT;
    this.server = require('http').createServer(this.app);

    //Paths
    this.paths = {
      auth: '/api/auth',
      search: '/api/search',
    };

    // Connect to database
    this.dbConnection();

    // Use JSON
    this.app.use(express.json());

    // Middlewares
    this.middlewares();

    // Routes
    this.routes();
  }

  async dbConnection() {
    try {
      await db();
      console.log(
        '\x1b[32m-----------------------\n\x1b[1mDATABASE CONNECTED! ✅\n-----------------------\x1b[0m'
      );
    } catch (error) {
      console.log(
        '\x1b[31m-------------------\n\x1b[1mDATABASE ERROR: ',
        error,
        '\n-------------------\x1b[0m'
      );
    }
  }

  middlewares() {
    // Morgan
    this.app.use(logger('dev'));

    // Read and parse body
    this.app.use(express.json());

    // Cors
    this.app.use(cors());
  }

  routes() {
    this.app.use(this.paths.auth, require('../routes/authRoutes'));
    this.app.use(this.paths.search, require('../routes/searchRoutes'));
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log(
        `\x1b[34m----------------------------\nSERVER RUNNING ON PORT: \x1b[1m${this.port}\n----------------------------\x1b[0m`
      );
    });
  }
}

module.exports = Server;
