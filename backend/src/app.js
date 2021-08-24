/**
 * app.js is the main app that handles all of the API routes.
 */

// set up dotenv
require('dotenv').config();


const express = require('express');
const app = express(); // app is exported


// == Setting up api validation ==
const OpenApiValidator = require('express-openapi-validator');
const swaggerUi = require('swagger-ui-express'); // UI API testing
const YAML = require('js-yaml');
const fs = require('fs');
const apiSpec = YAML.load(fs.readFileSync('src/api/openapi.yaml')); // load the api spec


const { createNewSecret, cleanUpExpiredSecrets, retrieveSecret } = require('./secret');

/**
 * Middleware Setup
 */
// set up express json parser
app.use(express.json());

// == Setting up api validation middleware ==
// this sets up the api testing GUI
app.use('/v1/api-docs', swaggerUi.serve, swaggerUi.setup(apiSpec));
// this sets up the api validation middleware
app.use(
    OpenApiValidator.middleware({
        apiSpec: apiSpec,
        validateRequests: true,
        validateResponses: true,
    })
);
// this is the error handler
app.use((err, req, res, next) => {
    // format error
    res.status(err.status || 500).json({
        message: err.message,
        errors: err.errors,
    });
});

// set up my middleware for cleaning up expired secrets
app.use(cleanUpExpiredSecrets);

/**
 * Paths
 */
// Default path to test if server is on
app.get('/v1/', (req, res) => {
    res.status(200).send('Hello world!');
});
app.post('/v1/secret/', createNewSecret); // creates a secret
app.post('/v1/secret/:id', retrieveSecret); // retrieves a secret

module.exports = app;
