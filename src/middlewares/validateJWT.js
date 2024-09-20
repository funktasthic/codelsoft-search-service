const { response } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');

const validateJWT = async (req, res = response, next) => {
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
    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(id);

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
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        error: true,
        message: 'Expired token',
      });
    }
    return res.status(401).json({
      success: false,
      error: true,
      message: 'Invalid token',
    });
  }
};

module.exports = { validateJWT };
