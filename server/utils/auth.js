const { sign, verify } = require('jsonwebtoken');

/**
 * Creates the Web Token using the Users ID and the Secret key from the env file
 * and set the expiration to 24 hours.
 *
 * @param {string} id - The User ID from the DB.
 * @param {string} secret - The secret or private key.
 * @returns {string} The users web token string.
 */
const createUserToken = async (id, secret) => {
  return await sign({ id }, secret, { expiresIn: '1d' });
}

/**
 * Takes the users web token and the secret/private key and verifies the validity of
 * the token. Resolves to an object or rejects with an error message.
 *
 * @param {string} token - The web token that required verification
 * @param {string} secret - The secret or private key
 * @returns {object} returns an object including matching token and expiration.
 */
const verifyUserToken = async (token, secret) => {
  return await verify(token, secret);
}

module.exports = {
  createUserToken,
  verifyUserToken,
}
