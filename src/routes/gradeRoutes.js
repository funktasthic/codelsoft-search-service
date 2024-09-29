const { Router } = require('express');

// Controllers
const {
  createGrade,
  getAllGrades,
  getGrade,
  deleteGrade,
  updateGrade,
} = require('../controllers/gradeController');

// Validators
const { createGradeValidator, updateGradeValidator } = require('../validators/gradeValidator');

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Grades
 */

/**
 * @swagger
 * /api/grades/all:
 *   get:
 *     summary: Retrieve all grades
 *     tags: [Grades]
 *     responses:
 *       200:
 *         description: Grades retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Grade'
 *                 message:
 *                   type: string
 *                   example: Grades retrieved successfully
 *       404:
 *         description: No grades found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: No grades found
 *                 error:
 *                   type: boolean
 *                   example: true
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Error message
 */

/**
 * @swagger
 * /api/grades/{id}:
 *   get:
 *     summary: Retrieve a single grade by ID
 *     tags: [Grades]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the grade to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Grade retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Grade'
 *                 message:
 *                   type: string
 *                   example: Grade retrieved successfully
 *       404:
 *         description: Grade not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Grade not found
 *                 error:
 *                   type: boolean
 *                   example: true
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Error message
 */

/**
 * @swagger
 * /api/grades/create:
 *   post:
 *     summary: Create a new grade
 *     tags: [Grades]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               subjectName:
 *                 type: string
 *                 example: Mathematics
 *               gradeName:
 *                 type: string
 *                 example: Midterm Exam
 *               grade:
 *                 type: number
 *                 example: 95
 *               comment:
 *                 type: string
 *                 example: Excellent performance
 *               studentId:
 *                 type: string
 *                 example: 5f43c1562a97370004f3d7b1
 *     responses:
 *       201:
 *         description: Grade created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Grade'
 *                 message:
 *                   type: string
 *                   example: Grade created successfully
 *       403:
 *         description: Insufficient permissions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Insufficient permissions
 *                 error:
 *                   type: boolean
 *                   example: true
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: User not found
 *                 error:
 *                   type: boolean
 *                   example: true
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Error message
 */

/**
 * @swagger
 * /api/grades/update/{id}:
 *   put:
 *     summary: Update an existing grade
 *     tags: [Grades]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the grade to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               subjectName:
 *                 type: string
 *                 example: Mathematics
 *               gradeName:
 *                 type: string
 *                 example: Midterm Exam
 *               grade:
 *                 type: number
 *                 example: 95
 *               comment:
 *                 type: string
 *                 example: Excellent performance
 *     responses:
 *       200:
 *         description: Grade updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Grade'
 *                 message:
 *                   type: string
 *                   example: Grade updated successfully
 *       404:
 *         description: Grade not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Grade not found
 *                 error:
 *                   type: boolean
 *                   example: true
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Error message
 */

/**
 * @swagger
 * /api/grades/{id}:
 *   delete:
 *     summary: Delete a grade by ID
 *     tags: [Grades]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the grade to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Grade deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Grade'
 *                 message:
 *                   type: string
 *                   example: Grade deleted successfully
 *       404:
 *         description: Grade not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Grade not found
 *                 error:
 *                   type: boolean
 *                   example: true
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Error message
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Grade:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: 5f43c1562a97370004f3d7b1
 *         subjectName:
 *           type: string
 *           example: Mathematics
 *         gradeName:
 *           type: string
 *           example: Midterm Exam
 *         grade:
 *           type: number
 *           example: 95
 *         comment:
 *           type: string
 *           example: Excellent performance
 *         studentId:
 *           type: string
 *           example: 5f43c1562a97370004f3d7b1
 */

// Get all grades
router.get('/all', getAllGrades);

// Get grade
router.get('/:id', getGrade);

// Create grade
router.post('/create', [createGradeValidator], createGrade);

// Update grade
router.put('/update/:id', [updateGradeValidator], updateGrade);

// Delete grade
router.delete('/:id', deleteGrade);

module.exports = router;
