const { Router } = require('express');

// Controllers
const { login } = require('../controllers/authController');
const { validateToken } = require('../controllers/authController');

const router = Router();

// Login user
router.post('/login', login);

// Verify token
router.get('/verify-token', validateToken);

module.exports = router;
