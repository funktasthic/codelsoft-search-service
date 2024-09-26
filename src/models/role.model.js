const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const roleSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4,
  },
  name: {
    type: String,
    required: true,
    unique: true,
    enum: ['ADMIN', 'TEACHER', 'STUDENT'],
  },
});

module.exports = mongoose.model('Role', roleSchema);
