const jwt = require('jsonwebtoken');

/**
 * Generates a JSON Web Token (JWT) for the given user id.
 * @param {string} id - User id to generate the token for.
 * @returns {Promise<string>} - Promise that resolves with the generated token.
 */
const generateJWT = (id = '') => {
  return new Promise((resolve, reject) => {
    const payload = { id };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: '10h',
      },
      (error, token) => {
        if (error) {
          console.log(error);
          reject('Token can not be generated');
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = generateJWT;
