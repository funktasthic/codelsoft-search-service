const { Router } = require('express');

// Middlewares
const { validateJWT } = require('../middlewares/validateJWT');

// Controllers
const { getStudentGradesAndRestrictions } = require('../controllers/searchController');
const { getStudentByRestrictionOrReason } = require('../controllers/searchController');
const { getStudentsByGradeRange } = require('../controllers/searchController');

const router = Router();

// Search student grades and restrictions
router.get('/student', [validateJWT], getStudentGradesAndRestrictions);

// Search student by restriction or reason
router.get('/restriction', [validateJWT], getStudentByRestrictionOrReason);

// Search student by grade range
router.get('/grade', [validateJWT], getStudentsByGradeRange);

module.exports = router;
