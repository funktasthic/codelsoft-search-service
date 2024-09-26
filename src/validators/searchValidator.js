const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validateFields');

const getStudentGradesAndRestrictionsValidator = [
  check('search', 'Search must be a string').optional().isString(),
  check('search')
    .isLength({ max: 255 })
    .withMessage('Search must be no more than 255 characters long'),

  validateFields,
];

const getStudentByRestrictionOrReasonValidator = [
  check('search', 'Search must be a string').optional().isString(),
  check('search')
    .isLength({ max: 255 })
    .withMessage('Search must be no more than 255 characters long'),

  validateFields,
];

const getStudentsByGradeRangeValidator = [
  check('minGrade', 'Minimum grade must be a number').optional().isNumeric(),
  check('maxGrade', 'Maximum grade must be a number').optional().isNumeric(),
  check('minGrade')
    .isLength({ max: 255 })
    .withMessage('Minimum grade must be no more than 255 characters long'),
  check('maxGrade')
    .isLength({ max: 255 })
    .withMessage('Maximum grade must be no more than 255 characters long'),

  validateFields,
];

module.exports = {
  getStudentGradesAndRestrictionsValidator,
  getStudentByRestrictionOrReasonValidator,
  getStudentsByGradeRangeValidator,
};
