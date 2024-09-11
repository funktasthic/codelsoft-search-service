const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const gradeSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
    },
    subjectName: {
      type: String,
      required: true,
    },
    gradeName: {
      type: String,
      required: true,
    },
    grade: {
      type: Number,
      min: 1.0,
      max: 7.0,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    studentId: {
      type: String,
      ref: 'User',
      required: true,
    },
    teacherId: {
      type: String,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Grade', gradeSchema);
