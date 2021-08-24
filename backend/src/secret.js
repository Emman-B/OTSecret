/**
 * This source file is responsible for handling the storage of secrets.
 */

const crypto = require('crypto'); // for randomly generating an ID
const bcrypt = require('bcrypt'); // for password encryption
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.SECRET_KEY);

// Storage involves using a Map(), mapping secret IDs to an object
const storage = new Map();

/**
 * Deletes any expired secrets. This is middleware that should be run on every
 * request.
 * @param {import('express').Request} req client request
 * @param {import('express').Response} res server response
 * @param {import('express').NextFunction} next next function after the middleware 
 */
exports.cleanUpExpiredSecrets = async (req, res, next) => {
    for (const [key, value] of storage.entries()) {
        const id = key;
        const expirationDate = value.expires;

        // delete if the expiration date is old
        if (expirationDate <= new Date()) {
            storage.delete(id);
        }
    }
    next();
}

/**
 * Creates a new secret
 * @param {import('express').Request} req client request
 * @param {import('express').Response} res server response
 */
exports.createNewSecret = async (req, res) => {
    // generate a random ID
    let id = crypto.randomBytes(32).toString('hex');

    // there is a rare possibility that the id is already in storage
    //      so it should be handled
    while (storage.has(id)) {
        id = crypto.randomBytes(32).toString('hex');
    }

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

    // store the secret into storage
    storage.set(id, secret);

    return res.status(200).json({id: id});
}

/**
 * Retrieves the decrypted message and deletes the secret
 * @param {import('express').Request} req client request
 * @param {import('express').Response} res server response
 */
exports.retrieveSecret = async (req, res) => {
    const {id} = req.params;

    const secret = storage.get(id);
    // if secret was not found, return 404
    if (secret == null) {
        return res.status(404).send();
    }

    const {password} = req.body;
    if (bcrypt.compareSync(password, secret.password)) {
        // correct password, decrypt the message and send it as a response
        const decryptedMessage = cryptr.decrypt(secret.message);
        storage.delete(id);
        return res.status(200).json({message: decryptedMessage});
    } else {
        return res.status(404).send();
    }
}
