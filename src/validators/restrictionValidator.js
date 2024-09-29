const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validateFields');

const createRestrictionValidator = [
  // Required
  check('reason', 'Reason is required').not().isEmpty(),
  check('studentId', 'Student ID is required').not().isEmpty(),

  // String
  check('reason', 'Reason must be a string').isString(),
  check('studentId', 'Student ID must be a string').isString(),

  // Min Length
  check('reason').isLength({ min: 3 }).withMessage('Reason must be at least 3 characters long'),

  // Max Length
  check('reason')
    .isLength({ max: 255 })
    .withMessage('Reason must be no more than 255 characters long'),

  validateFields,
];

const updateRestrictionValidator = [
  // Required
  check('reason', 'Reason is required').not().isEmpty(),

  // String
  check('reason', 'Reason must be a string').isString(),

  // Min Length
  check('reason').isLength({ min: 3 }).withMessage('Reason must be at least 3 characters long'),

  // Max Length
  check('reason')
    .isLength({ max: 255 })
    .withMessage('Reason must be no more than 255 characters long'),

  validateFields,
];

module.exports = { createRestrictionValidator, updateRestrictionValidator };
