/**
 * server.js is responsible for starting the server.
 */

const app = require('./app');

// == Database Setup == //
const fs = require('fs');
const path = require('path'); // for resolving pathnames
const { Client } = require('pg');
const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
});

// == Starts the server ==
app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);

    // run the database setup
    client.connect((err) => {
        // failure case: throw error
        if (err) throw `Database connection failed, reason: ${err}`;
        // success case: run the setup sql commands
        else {
            // find the path to setup.sql
            let pathToSetup = process.cwd();
            if(!process.cwd().includes('backend')) {
                // If running backend from root directory, add backend to the path
                pathToSetup = path.resolve(pathToSetup, 'backend');
            }
            // so pathToSetup is now at the backend/ directory. Direct the path to the setup.sql file
            pathToSetup = path.resolve(pathToSetup, 'src', 'sql', 'setup.sql');
            // then, use this path to read the sql file and run it as a query
            try {
                client.query(fs.readFileSync(pathToSetup, {encoding: 'utf-8'}));
                console.log('Database setup successful');
            } catch (err) {
                throw `Database setup failed, reason: ${err}`;
            }
        }
    })
});
