const jwt = require('jsonwebtoken');

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
