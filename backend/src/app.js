/**
 * app.js is the main app that handles all of the API routes.
 */
// if running this from root, indicate the backend directory since that is where .env is held
const pathModule = require('path');
let path = pathModule.resolve(process.cwd(), '.env');
if (!process.cwd().includes('backend')) {
    path = pathModule.resolve(process.cwd(), 'backend', '.env');
}
// set up dotenv
require('dotenv').config({path: path});


const express = require('express');
const app = express(); // app is exported

const cors = require('cors');


// == Setting up api validation ==
const OpenApiValidator = require('express-openapi-validator');
const swaggerUi = require('swagger-ui-express'); // UI API testing
const YAML = require('js-yaml');
const fs = require('fs');
let apiSpec = undefined; // api spec needs to be loaded in depending on where node is being run
if (process.cwd().includes('backend')) {
    apiSpec = YAML.load(fs.readFileSync('src/api/openapi.yaml')); // load the api spec from backend/
} else {
    apiSpec = YAML.load(fs.readFileSync('backend/src/api/openapi.yaml')); // load the api spec from root
}


const { createNewSecret, cleanUpExpiredSecrets, retrieveSecret } = require('./secret');

/**
 * Middleware Setup
 */

// set up cors
const devURL = `http://localhost:3000`;
const prodURL = process.env.PROD_URL;
const allowedOrigins = [process.env.NODE_ENV === 'development'?devURL: prodURL];
const corsOptions = {
    origin: allowedOrigins
};
app.use(cors(corsOptions));

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
