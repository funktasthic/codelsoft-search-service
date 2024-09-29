const { Router } = require('express');

// Controllers
const {
  createRestriction,
  getAllRestrictions,
  getRestriction,
  updateRestriction,
  deleteRestriction,
} = require('../controllers/restrictionController');

// Validators
const {
  createRestrictionValidator,
  updateRestrictionValidator,
} = require('../validators/restrictionValidator');

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Restriction:
 *       type: object
 *       required:
 *         - reason
 *         - studentId
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: The ID of the restriction
 *         reason:
 *           type: string
 *           description: The reason for the restriction
 *         studentId:
 *           type: string
 *           format: uuid
 *           description: The ID of the associated student
 *       example:
 *         reason: "Violation of rules"
 *         studentId: "123e4567-e89b-12d3-a456-426614174000"
 */

/**
 * @swagger
 * tags:
 *   name: Restrictions
 */

/**
 * @swagger
 * /api/restrictions/all:
 *   get:
 *     summary: Retrieve all restrictions
 *     tags: [Restrictions]
 *     responses:
 *       200:
 *         description: List of restrictions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates whether the request was successful
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Restriction'
 *       404:
 *         description: No restrictions found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/restrictions/{id}:
 *   get:
 *     summary: Retrieve a specific restriction by ID
 *     tags: [Restrictions]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the restriction
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Restriction found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Restriction'
 *       404:
 *         description: Restriction not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/restrictions/create:
 *   post:
 *     summary: Create a new restriction
 *     tags: [Restrictions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Restriction'
 *     responses:
 *       201:
 *         description: Restriction created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Restriction'
 *       404:
 *         description: User not found
 *       403:
 *         description: Insufficient permissions
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/restrictions/update/{id}:
 *   put:
 *     summary: Update an existing restriction
 *     tags: [Restrictions]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the restriction
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reason:
 *                 type: string
 *     responses:
 *       200:
 *         description: Restriction updated successfully
 *       404:
 *         description: Restriction not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/restrictions/{id}:
 *   delete:
 *     summary: Delete a restriction by ID
 *     tags: [Restrictions]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the restriction
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Restriction deleted successfully
 *       404:
 *         description: Restriction not found
 *       500:
 *         description: Server error
 */

// Get all restrictions
router.get('/all', getAllRestrictions);

// Get restriction
router.get('/:id', getRestriction);

// Create restriction
router.post('/create', [createRestrictionValidator], createRestriction);

// Update restriction
router.put('/update/:id', [updateRestrictionValidator], updateRestriction);

// Delete restriction
router.delete('/:id', deleteRestriction);

module.exports = router;
