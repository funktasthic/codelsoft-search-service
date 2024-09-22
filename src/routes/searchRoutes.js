const { Router } = require('express');

// Middlewares
const { validateJWT } = require('../middlewares/validateJWT');

// Controllers
const { getStudentGradesAndRestrictions } = require('../controllers/searchController');
const { getStudentByRestrictionOrReason } = require('../controllers/searchController');

const router = Router();

// Search student grades and restrictions
router.get('/student', [validateJWT], getStudentGradesAndRestrictions);

router.get('/restriction', [validateJWT], getStudentByRestrictionOrReason);

module.exports = router;
