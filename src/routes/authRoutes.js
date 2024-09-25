const { Router } = require('express');

// Controllers
const { login } = require('../controllers/authController');
const { validateToken } = require('../controllers/authController');
const { register } = require('../controllers/authController');

// Validators
const { loginValidator } = require('../validators/authValidator');
const { registerValidator } = require('../validators/authValidator');

const router = Router();

// Register user
router.post('/register', [registerValidator], register);

// Login user
router.post('/login', [loginValidator], login);

// Verify token
router.get('/verify-token', validateToken);

module.exports = router;
