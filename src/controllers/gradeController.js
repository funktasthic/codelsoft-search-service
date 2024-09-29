const { response, request } = require('express');
require('dotenv').config();
const User = require('../models/user.model');
const Role = require('../models/role.model');
const Grade = require('../models/grade.model');
const GradeService = require('../services/gradeService');

/**
 * Retrieves all grades from the database
 * @function
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Promise<void>}
 */
const getAllGrades = async (req = request, res = response) => {
  try {
    // Find all grades
    const grades = await Grade.find();

    // Verify if any grades exists
    if (grades.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No grades found',
        error: true,
      });
    }

    return res.status(200).json({
      success: true,
      data: grades,
      message: 'Grades retrieved successfully',
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
 * Retrieves a single grade from the database by ID
 * @function
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Promise<void>}
 */
const getGrade = async (req = request, res = response) => {
  try {
    const { id } = req.params;

    // Find grade by ID

    const grade = await Grade.findById(id);

    // Verify if grade exists
    if (!grade) {
      return res.status(404).json({
        success: false,
        message: 'Grade not found',
        error: true,
      });
    }

    return res.status(200).json({
      success: true,
      data: grade,
      message: 'Grade retrieved successfully',
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
 * Creates a new grade in the database
 * @function
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Promise<void>}
 */
const createGrade = async (req = request, res = response) => {
  try {
    const { subjectName, gradeName, grade, comment, studentId } = req.body;

    // Validate if the user exists
    const existingUser = await User.findOne({ _id: studentId });

    // Validate if aby user exists
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: true,
      });
    }

    // Validate if the user is a student
    const role = await Role.findById(existingUser.roleId);

    if (!role || role.name !== 'STUDENT') {
      return res.status(403).json({
        success: false,
        message: 'Insufficient permissions',
        error: true,
      });
    }

    // Create the new grade
    const gradeData = { subjectName, gradeName, grade, comment, studentId };

    // Crear la calificación usando el servicio
    const newGrade = await GradeService.createGrade(gradeData);

    return res.status(201).json({
      success: true,
      data: newGrade,
      message: 'Grade created successfully',
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
 * Updates an existing grade in the database
 * @function
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Promise<void>}
 */
const updateGrade = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const { subjectName, gradeName, grade, comment } = req.body;

    // Validate if the grade exists
    const gradeData = { subjectName, gradeName, grade, comment };

    // Update the grade
    const updatedGrade = await Grade.findByIdAndUpdate(id, gradeData, {
      new: true,
    });

    // Verify if grade exists
    if (!updatedGrade) {
      return res.status(404).json({
        success: false,
        message: 'Grade not found',
        error: true,
      });
    }

    return res.status(200).json({
      success: true,
      data: updatedGrade,
      message: 'Grade updated successfully',
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
 * Deletes an existing grade in the database
 * @function
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Promise<void>}
 */
const deleteGrade = async (req = request, res = response) => {
  try {
    const { id } = req.params;

    // Validate if the grade exists
    const deletedGrade = await Grade.findByIdAndDelete(id);

    if (!deletedGrade) {
      return res.status(404).json({
        success: false,
        message: 'Grade not found',
        error: true,
      });
    }

    return res.status(200).json({
      success: true,
      data: deletedGrade,
      message: 'Grade deleted successfully',
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
  createGrade,
  getAllGrades,
  getGrade,
  updateGrade,
  deleteGrade,
};
