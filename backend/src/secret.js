/**
 * This source file is responsible for handling the storage of secrets.
 */

const crypto = require('crypto'); // for randomly generating an ID
const bcrypt = require('bcrypt'); // for password encryption
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.SECRET_KEY);

// get access to database functions
const db = require('./db.js');

/**
 * Deletes any expired secrets. This is middleware that should be run on every
 * request.
 * @param {import('express').Request} req client request
 * @param {import('express').Response} res server response
 * @param {import('express').NextFunction} next next function after the middleware 
 */
exports.cleanUpExpiredSecrets = async (req, res, next) => {
    await db.deleteExpiredSecrets();
    next();
}

/**
 * Creates a new secret
 * @param {import('express').Request} req client request
 * @param {import('express').Response} res server response
 */
exports.createNewSecret = async (req, res) => {
    const {password, message} = req.body;
    const secret = {};

    // store the hashed password into the secret object
    secret.password = await bcrypt.hash(password, 10);
    // store the encrypted message into the secret object
    secret.message = cryptr.encrypt(message);
    // store the expiration date as well
    const expirationDate = new Date();
    expirationDate.setMinutes(expirationDate.getMinutes() + 15);
    secret.expires = expirationDate;

    // store the secret into the database
    const id = await db.storeSecret(secret.password, secret.message, secret.expires);

    return res.status(200).json({id: id});
}

/**
 * Retrieves the decrypted message and deletes the secret
 * @param {import('express').Request} req client request
 * @param {import('express').Response} res server response
 */
exports.retrieveSecret = async (req, res) => {
    const {id} = req.params;

    // get the secret from the database
    const secret = await db.retrieveSecret(id);

    // if secret was not found, return 404
    if (secret == null) {
        return res.status(404).send();
    }

    const {password} = req.body;
    if (bcrypt.compareSync(password, secret.password)) {
        // correct password, decrypt the message and send it as a response
        const decryptedMessage = cryptr.decrypt(secret.message);
        await db.deleteSecret(id);
        return res.status(200).json({message: decryptedMessage});
    } else {
        return res.status(404).send();
    }
}
