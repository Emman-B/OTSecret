/**
 * server.js is responsible for starting the server.
 */

const app = require('./app');

// Starts the server
app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
});
