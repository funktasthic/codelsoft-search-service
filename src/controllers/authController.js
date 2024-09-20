const { response, request } = require('express');
const User = require('../models/user.model');
const bcryptjs = require('bcryptjs');
const generateJWT = require('../utils/generateJWT');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const login = async (req = request, res = response) => {
  try {
    const { email, password } = req.body;

    // Validate exists email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        error: true,
        message: 'Invalid credentials',
      });
    }

    // Verify password
    const validPassword = bcryptjs.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        error: true,
        message: 'Invalid credentials',
      });
    }

    // Generate JWT
    const token = await generateJWT(user.id);

    const { id, name, lastName, email: emailUser, roleId } = user;

    const dataUser = {
      id,
      name,
      lastName,
      email: emailUser,
      roleId,
      token: token,
    };

    return res.status(200).json({
      success: true,
      data: dataUser,
      message: 'Login successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message,
    });
  }
};

const validateToken = async (req = request, res = response) => {
  const authHeader = req.headers['authorization'];

  // Separate the token from the "Bearer" prefix
  token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'No token provided',
    });
  }

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(id);

    const { name, lastName, email, roleId } = user;

    const dataUser = {
      id,
      name,
      lastName,
      email,
      roleId,
      token: token,
    };

    if (user) {
      return res.status(200).json({
        success: true,
        message: 'Token valid',
        data: dataUser,
      });
    }
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expired',
        expired: true,
        error,
      });
    }
    return res.status(401).json({
      success: false,
      message: 'Token invalid',
      error,
    });
  }
};

module.exports = {
  login,
  validateToken,
};
