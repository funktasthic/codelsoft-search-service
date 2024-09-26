const { response } = require('express');
const { validationResult } = require('express-validator');

/**
 * Validate fields using express-validator
 * @function
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next function in the middleware chain
 * @returns {Promise<void>}
 */
const validateFields = (req, res = response, next) => {
  // Check for errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errors.array().map((error) => error.msg);

    return res.status(400).json(errors);
  }

  next();
};

module.exports = { validateFields };
