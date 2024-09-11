const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const restrictionSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
    },
    reason: {
      type: String,
      required: true,
    },
    studentId: {
      type: String,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Restriction', restrictionSchema);
