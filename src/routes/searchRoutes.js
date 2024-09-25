const { Router } = require('express');

// Middlewares
const { validateJWT } = require('../middlewares/validateJWT');

// Controllers
const { getStudentGradesAndRestrictions } = require('../controllers/searchController');
const { getStudentByRestrictionOrReason } = require('../controllers/searchController');
const { getStudentsByGradeRange } = require('../controllers/searchController');

// Validators
const { getStudentGradesAndRestrictionsValidator } = require('../validators/searchValidator');
const { getStudentByRestrictionOrReasonValidator } = require('../validators/searchValidator');
const { getStudentsByGradeRangeValidator } = require('../validators/searchValidator');

const router = Router();

// Search student grades and restrictions
router.get(
  '/student',
  [validateJWT, getStudentGradesAndRestrictionsValidator],
  getStudentGradesAndRestrictions
);

// Search student by restriction or reason
router.get(
  '/restriction',
  [validateJWT, getStudentByRestrictionOrReasonValidator],
  getStudentByRestrictionOrReason
);

// Search student by grade range
router.get('/grade', [validateJWT, getStudentsByGradeRangeValidator], getStudentsByGradeRange);

module.exports = router;
