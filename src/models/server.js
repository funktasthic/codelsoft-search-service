const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const db = require('../database/connection');
const config = require('../database/config/config');

class Server {
  /**
   * Constructor for the Server class.
   *
   * This constructor will set up the express app, assign the port, and create the server.
   * Also, it will connect to the database, use JSON, and execute the middlewares and routes functions.
   *
   * @memberof Server
   */
  constructor() {
    this.app = express();
    this.port = config.PORT;
    this.server = require('http').createServer(this.app);

    // Paths
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
    // Listen to the server
    this.server.listen(this.port, () => {
      console.log(
        `\x1b[34m----------------------------\nSERVER RUNNING ON PORT: \x1b[1m${this.port}\n----------------------------\x1b[0m`
      );
    });
  }
}

module.exports = Server;
