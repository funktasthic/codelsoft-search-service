const { response, request } = require('express');
require('dotenv').config();
const User = require('../models/user.model');
const Role = require('../models/role.model');
const { v4: uuidv4 } = require('uuid');

const getAllUsers = async (req = request, res = response) => {
  try {
    const users = await User.find();

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No users found',
        error: true,
      });
    }

    const userData = users.map((user) => {
      return {
        _id: user._id,
        name: user.name,
        lastName: user.lastName,
        fullName: user.fullName,
        email: user.email,
      };
    });

    return res.status(200).json({
      success: true,
      data: userData,
      message: 'Users retrieved successfully',
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

const getUser = async (req = request, res = response) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: true,
      });
    }

    const userData = {
      _id: user._id,
      name: user.name,
      lastName: user.lastName,
      fullName: user.fullName,
      email: user.email,
    };

    return res.status(200).json({
      success: true,
      data: userData,
      message: 'User retrieved successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message,
    });
  }
};

const createUser = async (req = request, res = response) => {
  try {
    const { name, lastName, email, roleName } = req.body;

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
      roleId: role._id,
    };

    // Create user in db
    const user = new User(userData);

    // Save the user in DB
    await user.save();

    const dataUser = {
      id: user.id,
      name: user.name,
      lastName: user.lastName,
      fullName: user.fullName,
      email: user.email,
      roleName: role.name,
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

const updateUser = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const { name, lastName, email } = req.body;

    // Validate if the user exists
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: true,
      });
    }

    // Check if email is already in use by another user
    const existingUserWithEmail = await User.findOne({ email });

    if (existingUserWithEmail && existingUserWithEmail._id.toString() !== id) {
      return res.status(400).json({
        success: false,
        message: 'Email is already in use by another user',
        error: true,
      });
    }

    // Prepare user data for update
    const userData = {
      name,
      lastName,
      fullName: `${name} ${lastName}`,
      email,
    };

    // Save the user in DB
    const updatedUser = await User.findByIdAndUpdate(id, userData, { new: true });

    const dataUser = {
      id: updatedUser._id,
      name: updatedUser.name,
      lastName: updatedUser.lastName,
      fullName: updatedUser.fullName,
      email: updatedUser.email,
    };

    return res.status(200).json({
      success: true,
      data: dataUser,
      message: 'User updated successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message,
    });
  }
};

const deleteUser = async (req = request, res = response) => {
  try {
    const { id } = req.params;

    // Validate if the user exists
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: true,
      });
    }

    // Delete the user in DB
    await User.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message,
    });
  }
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
