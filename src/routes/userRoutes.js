const { Router } = require('express');

// Controllers
const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

// Validators
const { createUserValidator, updateUserValidator } = require('../validators/userValidator');

const router = Router();

// Get all users
router.get('/all', getAllUsers);

// Get user
router.get('/:id', getUser);

// Create user
router.post('/create', [createUserValidator], createUser);

// Update user
router.put('/update/:id', [updateUserValidator], updateUser);

// Delete user
router.delete('/:id', deleteUser);

module.exports = router;
