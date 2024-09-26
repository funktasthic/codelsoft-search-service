const { Router } = require('express');
const { validateJWT } = require('../middlewares/validateJWT');
const {
  getStudentGradesAndRestrictions,
  getStudentByRestrictionOrReason,
  getStudentsByGradeRange,
} = require('../controllers/searchController');
const {
  getStudentGradesAndRestrictionsValidator,
  getStudentByRestrictionOrReasonValidator,
  getStudentsByGradeRangeValidator,
} = require('../validators/searchValidator');

const router = Router();

/**
 * @swagger
 * /api/search/student:
 *   get:
 *     summary: Search for a student's grades and restrictions
 *     description: Retrieves a student's grades and restrictions by ID or full name.
 *     tags:
 *       - Students
 *     parameters:
 *       - name: search
 *         in: query
 *         description: Search by ID or full name
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       student:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           fullName:
 *                             type: string
 *                           email:
 *                             type: string
 *                           grades:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 subjectName:
 *                                   type: string
 *                                 grade:
 *                                   type: number
 *                           restrictions:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 reason:
 *                                   type: string
 *       404:
 *         description: Student not found
 *       500:
 *         description: Internal server error
 */
router.get(
  '/student',
  [validateJWT, getStudentGradesAndRestrictionsValidator],
  getStudentGradesAndRestrictions
);

/**
 * @swagger
 * /api/search/restriction:
 *   get:
 *     summary: Search students by restriction or reason
 *     description: Retrieves students associated with a specific restriction by ID or reason.
 *     tags:
 *       - Restrictions
 *     parameters:
 *       - name: search
 *         in: query
 *         description: Search by restriction ID or reason
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       student:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           fullName:
 *                             type: string
 *                           restrictions:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 reason:
 *                                   type: string
 *       404:
 *         description: Restriction not found
 *       500:
 *         description: Internal server error
 */
router.get(
  '/restriction',
  [validateJWT, getStudentByRestrictionOrReasonValidator],
  getStudentByRestrictionOrReason
);

/**
 * @swagger
 * /api/search/grade:
 *   get:
 *     summary: Search students by grade range
 *     description: Retrieves students whose grades fall within a specified range.
 *     tags:
 *       - Grades
 *     parameters:
 *       - name: minGrade
 *         in: query
 *         description: Minimum grade
 *         required: false
 *         schema:
 *           type: number
 *       - name: maxGrade
 *         in: query
 *         description: Maximum grade
 *         required: false
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       student:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           fullName:
 *                             type: string
 *                           grades:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 subjectName:
 *                                   type: string
 *                                 grade:
 *                                   type: number
 *       404:
 *         description: Students not found in the specified range
 *       500:
 *         description: Internal server error
 */
router.get('/grade', [validateJWT, getStudentsByGradeRangeValidator], getStudentsByGradeRange);

module.exports = router;
