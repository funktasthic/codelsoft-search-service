const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const db = require('../database/connection');
const config = require('../database/config/config');

class Server {
  /**
   * Constructor of the Server class.
   *
   * This constructor is responsible to:
   * - Create an Express app
   * - Set the port
   * - Create an HTTP server
   * - Set the paths (auth, search, docs)
   * - Connect to the database
   * - Use Express.json() to parse JSON requests
   * - Set up the middlewares
   * - Set up the routes
   * - Set up the Swagger documentation
   */
  constructor() {
    this.app = express();
    this.port = config.PORT;
    this.server = require('http').createServer(this.app);

    // Paths
    this.paths = {
      user: '/api/users',
      search: '/api/search',
      grade: '/api/grades',
      restriction: '/api/restrictions',
      docs: '/api/docs',
    };

    // Connect to database
    this.dbConnection();

    // Use JSON
    this.app.use(express.json());

    // Middlewares
    this.middlewares();

    // Routes
    this.routes();

    // Swagger Docs
    this.setupSwagger();
  }

  middlewares() {
    // Morgan
    this.app.use(logger('dev'));

    // Read and parse body
    this.app.use(express.json());

    // Cors
    this.app.use(
      cors({
        origin: '*',
      })
    );
  }

  routes() {
    this.app.use(this.paths.user, require('../routes/userRoutes'));
    this.app.use(this.paths.search, require('../routes/searchRoutes'));
    this.app.use(this.paths.grade, require('../routes/gradeRoutes'));
    this.app.use(this.paths.restriction, require('../routes/restrictionRoutes'));
    this.app.get('/', (req, res) => {
      res.redirect(this.paths.docs);
    });
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

  setupSwagger() {
    const options = {
      definition: {
        openapi: '3.0.0',
        info: {
          title: 'Codelsoft Search Service API',
          version: '1.0.0',
          description: 'API documentation for the Codelsoft Search Service',
        },
        servers: [
          {
            url: `http://localhost:${this.port}`,
          },
        ],
      },
      apis: ['./src/routes/*.js', './src/models/*.js'],
    };

    const swaggerSpec = swaggerJsdoc(options);
    this.app.use(this.paths.docs, swaggerUi.serve, swaggerUi.setup(swaggerSpec));
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
