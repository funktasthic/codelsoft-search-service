const { response, request } = require('express');
require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const User = require('../models/user.model');
const Grade = require('../models/grade.model');
const Role = require('../models/role.model');

const createGrades = async (req = request, res = response) => {
  try {
    const { subjectName, gradeName, grade, comment, studentId } = req.body;

    const existingUser = await User.findOne({ studentId });

    // Validate if the user exists
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'User already exists in the system',
        error: true,
      });
    }

    // Create a new grade
    const newGrade = new Grade({
      _id: uuidv4(),
      subjectName,
      gradeName,
      grade,
      comment,
      studentId,
    });

    const dateGrade = await newGrade.save();

    return res.status(201).json({
      success: true,
      data: dateGrade,
      message: 'Grade created successfully',
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

const getAllGrades = async (req = request, res = response) => {
  try {
    const grades = await Grade.find();

    return res.status(200).json({
      success: true,
      data: grades,
      message: 'Grades retrieved successfully',
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

const editGrade = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const { subjectName, gradeName, grade, comment, studentId } = req.body;

    // Get the user making the request
    const user = await User.findById(req.user.id);
    const userRole = await Role.findById(user.roleId);

    // Check permissions for ADMIN or TEACHER
    if (userRole.name !== 'ADMIN' && userRole.name !== 'TEACHER') {
      return res.status(403).json({
        success: false,
        message: 'Insufficient permissions',
      });
    }

    // Find the grade by ID
    const gradeToEdit = await Grade.findById(id);

    // Validate if the grade exists
    if (!gradeToEdit) {
      return res.status(404).json({
        success: false,
        message: 'Grade not found',
        error: true,
      });
    }

    // Update the grade fields
    gradeToEdit.subjectName = subjectName || gradeToEdit.subjectName;
    gradeToEdit.gradeName = gradeName || gradeToEdit.gradeName;
    gradeToEdit.grade = grade || gradeToEdit.grade;
    gradeToEdit.comment = comment || gradeToEdit.comment;
    gradeToEdit.studentId = studentId || gradeToEdit.studentId;

    const updatedGrade = await gradeToEdit.save();

    return res.status(200).json({
      success: true,
      data: updatedGrade,
      message: 'Grade updated successfully',
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
  createGrades,
  getAllGrades,
  editGrade,
};
