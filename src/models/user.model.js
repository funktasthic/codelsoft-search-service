const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
    },
    fullName: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: function () {
        return this.role && this.role.name !== 'STUDENT';
      },
    },
    roleId: {
      type: String,
      ref: 'Role',
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', function (next) {
  this.fullName = `${this.name} ${this.lastName}`;
  next();
});

module.exports = mongoose.model('User', userSchema);
