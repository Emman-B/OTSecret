/*
    This source file handles any instances where the server is interacting with the database
*/

const { Pool } = require('pg');
const pool = new Pool({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
});


/**
 * Stores a secret into a database
 * @param {string} hashedPassword the hashed password being stored
 * @param {string} encryptedMessage the encrypted message being stored
 * @param {string} expiration when the secret will expire
 * @returns the ID of the message
 */
exports.storeSecret = async (hashedPassword, encryptedMessage, expiration) => {
    const query = {
        text: `INSERT INTO secrets (password, message, expiration) VALUES ($1, $2, $3) RETURNING id;`,
        values: [ hashedPassword, encryptedMessage, expiration ],
    };

    try {
        // retrieve the id of the newly created item (this is going to return 1 value)
        const { rows } = await pool.query(query);
        const { id } = rows[0];
        return id;
    } catch (err) {
        throw `Storing secret failed: ${err}`;
    }
};

/**
 * Retrieves the password and message of the secret specified by the ID.
 * The reason we retrieve the password is because we should use bcrypt
 * to find the secret with the password.
 * @param {string} id ID of the secret to retrieve
 * @returns hashed and salted password and message (pw for comparison w/ bcrypt)
 */
exports.retrieveSecret = async (id) => {
    const query = {
        text: `SELECT password, message FROM secrets WHERE id = $1;`,
        values: [ id ]
    };

    // First, try to retrieve the secret
    try {
        const { rows } = await pool.query(query);
    
        // If rows is empty, return null (meaning that no secret exists with that ID)
        if (rows.length === 0) return null;

        // Return the message and hashed+salted password for bcrypt comparison
        return {
            password: rows[0].password,
            message: rows[0].message,
        };
    } catch (err) {
        throw `Secret retrieval error: ${err}`;
    }
};

/**
 * Deletes a secret with a specified ID. This should only be called
 * if a secret message was successfully retrieved (i.e., with the
 * correct password).
 * @param {string} id id of secret to delete
 */
exports.deleteSecret = async (id) => {
    const query = {
        text: `DELETE FROM secrets WHERE id = $1`,
        values: [ id ]
    };

    try {
        await pool.query(query);
    } catch (err) {
        throw `Deleting secret has failed: ${err}`;
    }
}

/**
 * Deletes expired secrets from the database.
 */
exports.deleteExpiredSecrets = async () => {
    const query = {
        // Delete expired secrets
        text: `DELETE FROM secrets WHERE expiration < now();`
    };

    try {
        await pool.query(query);
    } catch (err) {
        throw `Deleting expired secrets has failed: ${err}`;
    }
};
