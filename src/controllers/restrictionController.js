const { response, request } = require('express');
require('dotenv').config();
const User = require('../models/user.model');
const Role = require('../models/role.model');
const Restriction = require('../models/restriction.model');
const RestrictionService = require('../services/restrictionService');

const getAllRestrictions = async (req = request, res = response) => {
  try {
    const restrictions = await Restriction.find();

    if (restrictions.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No restrictions found',
        error: true,
      });
    }

    return res.status(200).json({
      success: true,
      data: restrictions,
      message: 'Restrictions retrieved successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message,
    });
  }
};

const getRestriction = async (req = request, res = response) => {
  try {
    const { id } = req.params;

    const restriction = await Restriction.findById(id);

    if (!restriction) {
      return res.status(404).json({
        success: false,
        message: 'Restriction not found',
        error: true,
      });
    }

    return res.status(200).json({
      success: true,
      data: restriction,
      message: 'Restriction retrieved successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message,
    });
  }
};

const createRestriction = async (req = request, res = response) => {
  try {
    const { reason, studentId } = req.body;

    const existingUser = await User.findOne({ _id: studentId });

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: true,
      });
    }

    const role = await Role.findById(existingUser.roleId);

    if (!role || role.name !== 'STUDENT') {
      return res.status(403).json({
        success: false,
        message: 'Insufficient permissions',
        error: true,
      });
    }

    const restrictionData = { reason, studentId };
    const dataRestriction = await RestrictionService.createRestriction(restrictionData);

    return res.status(201).json({
      success: true,
      data: dataRestriction,
      message: 'Restriction created successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message,
    });
  }
};

const updateRestriction = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    const updatedRestriction = await Restriction.findByIdAndUpdate(id, { reason }, { new: true });

    if (!updatedRestriction) {
      return res.status(404).json({
        success: false,
        message: 'Restriction not found',
        error: true,
      });
    }

    return res.status(200).json({
      success: true,
      data: updatedRestriction,
      message: 'Restriction updated successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message,
    });
  }
};

const deleteRestriction = async (req = request, res = response) => {
  try {
    const { id } = req.params;

    const deletedRestriction = await Restriction.findByIdAndDelete(id);

    if (!deletedRestriction) {
      return res.status(404).json({
        success: false,
        message: 'Restriction not found',
        error: true,
      });
    }

    return res.status(200).json({
      success: true,
      data: deletedRestriction,
      message: 'Restriction deleted successfully',
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
  createRestriction,
  getAllRestrictions,
  getRestriction,
  updateRestriction,
  deleteRestriction,
};
