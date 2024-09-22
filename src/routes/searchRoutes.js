const { Router } = require('express');

// Middlewares
const { validateJWT } = require('../middlewares/validateJWT');

// Controllers
const { getStudentGradesAndRestrictions } = require('../controllers/searchController');

const router = Router();

// Search student grades and restrictions
router.get('/student', [validateJWT], getStudentGradesAndRestrictions);

module.exports = router;
