const { response, request } = require('express');
const User = require('../models/user.model');
const Role = require('../models/role.model');
const bcryptjs = require('bcryptjs');
const generateJWT = require('../utils/generateJWT');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { v4: uuidv4 } = require('uuid');

/**
 * Login user
 * @function login
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Promise<void>}
 */
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

    // Verify role
    const role = await Role.findById(user.roleId);
    if (!role) {
      return res.status(500).json({
        error: true,
        message: 'Role not found',
      });
    }

    // Generate JWT
    const token = await generateJWT(user.id);

    const { id, name, lastName, email: emailUser } = user;

    const dataUser = {
      id,
      name,
      lastName,
      email: emailUser,
      role: role.name,
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

/**
 * Verify the token in the Authorization header of the request.
 * If the token is valid, return the user data and the token.
 * If the token is invalid or expired, return an error message.
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @returns {Promise<void>}
 */
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

/**
 * Register a new user
 * @function register
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Promise<void>}
 */

const register = async (req = request, res = response) => {
  try {
    const { name, lastName, email, password, phone, roleName } = req.body;

    // Validate if the user exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'User already exists in the system',
        error: true,
      });
    }

    // Get the role by rolename
    const role = await Role.findOne({ name: roleName });

    if (!role) {
      return res.status(404).json({
        success: false,
        message: 'Role not found',
        error: true,
      });
    }

    const userData = {
      _id: uuidv4(),
      name,
      lastName,
      fullName: `${name} ${lastName}`,
      email,
      password,
      phone,
      roleId: role._id,
    };

    // Create user in db
    const user = new User(userData);

    // Hash the password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(user.password, salt);

    // Save the user in DB
    await user.save();

    // Generate JWT
    const token = await generateJWT(user.id);

    const dataUser = {
      id: user.id,
      name: user.name,
      lastName: user.lastName,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      password: user.password,
      roleId: user.roleId,
      token: token,
    };

    return res.status(201).json({
      success: true,
      data: dataUser,
      message: 'User created successfully',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message,
    });
  }
};

module.exports = {
  login,
  register,
  validateToken,
};
