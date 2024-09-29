const { response, request } = require('express');
require('dotenv').config();
const User = require('../models/user.model');
const Role = require('../models/role.model');
const Grade = require('../models/grade.model');
const GradeService = require('../services/gradeService');

const getAllGrades = async (req = request, res = response) => {
  try {
    const grades = await Grade.find();

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

const getGrade = async (req = request, res = response) => {
  try {
    const { id } = req.params;

    const grade = await Grade.findById(id);

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

const createGrade = async (req = request, res = response) => {
  try {
    const { subjectName, gradeName, grade, comment, studentId } = req.body;

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

module.exports = {
  createGrade,
};

const updateGrade = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const { subjectName, gradeName, grade, comment } = req.body;

    const gradeData = { subjectName, gradeName, grade, comment };
    const updatedGrade = await Grade.findByIdAndUpdate(id, gradeData, {
      new: true,
    });

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

const deleteGrade = async (req = request, res = response) => {
  try {
    const { id } = req.params;

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
