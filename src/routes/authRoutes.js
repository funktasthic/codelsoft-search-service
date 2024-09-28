const { Router } = require('express');

// Controllers
const { login, register } = require('../controllers/authController');

// Validators
const { loginValidator, registerValidator } = require('../validators/authValidator');

const router = Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Create a new user account
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: mypassword123
 *               phone:
 *                 type: string
 *                 example: '+123456789'
 *               roleName:
 *                 type: string
 *                 example: 'admin'
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 id: "a1234567-b890-1234-5678-cdef12345678"
 *                 name: "John"
 *                 lastName: "Doe"
 *                 email: "johndoe@example.com"
 *                 phone: "+123456789"
 *                 role: "admin"
 *                 token: "jwt-token-here"
 *               message: "User created successfully"
 *       409:
 *         description: User already exists
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "User already exists in the system"
 *               error: true
 *       500:
 *         description: Server error
 */
router.post('/register', [registerValidator], register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Log in a user
 *     description: Authenticate a user and return a JWT token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: mypassword123
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 id: "a1234567-b890-1234-5678-cdef12345678"
 *                 name: "John"
 *                 lastName: "Doe"
 *                 email: "johndoe@example.com"
 *                 role: "admin"
 *                 token: "jwt-token-here"
 *               message: "Login successfully"
 *       400:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Invalid credentials"
 *       500:
 *         description: Server error
 */
router.post('/login', [loginValidator], login);

module.exports = router;
