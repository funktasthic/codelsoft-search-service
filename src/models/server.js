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
        '\x1b[32m-----------------------\nDATABASE CONNECTED! ✅\n-----------------------\x1b[0m'
      );
    } catch (error) {
      console.log(
        '\x1b[31m-------------------\nDATABASE ERROR: ',
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
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log(
        `\x1b[34m--------------------------------------------\nSERVER RUNNING IN \x1b[35m${env.toUpperCase()}\x1b[34m, ON PORT: ${this.port}\n--------------------------------------------\x1b[0m`
      );
    });
  }
}

module.exports = Server;
