const jwt = require('jsonwebtoken');

/**
 * Verify the token and return the user id from the payload.
 * @function obtainUidJWT
 * @param {string} token - JSON Web Token to verify.
 * @returns {string} User id from the payload.
 */
const obtainUidJWT = (token) => {
  const secret = process.env.JWT_SECRET;
  const { uid } = jwt.verify(token, secret);

  return uid;
};

module.exports = { obtainUidJWT };
