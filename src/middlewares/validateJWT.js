const { response } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');

/**
 * Validate the token in the Authorization header of the request.
 * If the token is valid, call next().
 * If the token is invalid or expired, return an error message.
 * @function validateJWT
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @param {function} next - next function
 * @returns {Promise<void>}
 */
const validateJWT = async (req, res = response, next) => {
  // Get the token from the Authorization header
  const authHeader = req.headers['authorization'];
  token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      error: true,
      message: 'No token provided',
    });
  }

  try {
    // Verify the token
    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    // Verify if the user exists
    const user = await User.findById(id);

    if (!user) {
      return res.status(401).json({
        success: false,
        error: true,
        message: 'Invalid token',
      });
    }

    req.user = user;
    next();
  } catch (error) {
    // If the token is expired, return an error
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        error: true,
        message: 'Expired token',
      });
    }

    // If the token is invalid, return an error
    return res.status(401).json({
      success: false,
      error: true,
      message: 'Invalid token',
    });
  }
};

module.exports = { validateJWT };
