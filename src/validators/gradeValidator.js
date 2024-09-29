const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validateFields');

const createGradeValidator = [
  // Required
  check('subjectName', 'Subject name is required').not().isEmpty(),
  check('gradeName', 'Grade name is required').not().isEmpty(),
  check('grade', 'Grade is required').not().isEmpty(),
  check('comment', 'Comment is required').not().isEmpty(),
  check('studentId', 'Student ID is required').not().isEmpty(),

  // String
  check('subjectName', 'Subject name must be a string').isString(),
  check('gradeName', 'Grade name must be a string').isString(),
  check('comment', 'Comment must be a string').isString(),
  check('studentId', 'Student ID must be a string').isString(),

  // Number
  check('grade', 'Grade must be a number').isNumeric(),
  check('grade')
    .isFloat({ min: 1.0, max: 7.0 })
    .withMessage('Grade must be a number between 1 and 7'),

  // Min Length
  check('subjectName')
    .isLength({ min: 3 })
    .withMessage('Subject name must be at least 3 characters long'),
  check('gradeName')
    .isLength({ min: 3 })
    .withMessage('Grade name must be at least 3 characters long'),
  check('comment').isLength({ min: 3 }).withMessage('Comment must be at least 3 characters long'),

  // Max Length
  check('subjectName')
    .isLength({ max: 255 })
    .withMessage('Subject name must be no more than 255 characters long'),
  check('gradeName')
    .isLength({ max: 255 })
    .withMessage('Grade name must be no more than 255 characters long'),
  check('comment')
    .isLength({ max: 255 })
    .withMessage('Comment must be no more than 255 characters long'),

  validateFields,
];

const updateGradeValidator = [
  // Required
  check('subjectName', 'Subject name is required').not().isEmpty(),
  check('gradeName', 'Grade name is required').not().isEmpty(),
  check('grade', 'Grade is required').not().isEmpty(),
  check('comment', 'Comment is required').not().isEmpty(),

  // String
  check('subjectName', 'Subject name must be a string').isString(),
  check('gradeName', 'Grade name must be a string').isString(),
  check('comment', 'Comment must be a string').isString(),

  // Min Length
  check('subjectName')
    .isLength({ min: 3 })
    .withMessage('Subject name must be at least 3 characters long'),
  check('gradeName')
    .isLength({ min: 3 })
    .withMessage('Grade name must be at least 3 characters long'),
  check('comment').isLength({ min: 3 }).withMessage('Comment must be at least 3 characters long'),

  // Max Length
  check('subjectName')
    .isLength({ max: 255 })
    .withMessage('Subject name must be no more than 255 characters long'),
  check('gradeName')
    .isLength({ max: 255 })
    .withMessage('Grade name must be no more than 255 characters long'),
  check('comment')
    .isLength({ max: 255 })
    .withMessage('Comment must be no more than 255 characters long'),

  // Number
  check('grade', 'Grade must be a number').isNumeric(),
  check('grade')
    .isFloat({ min: 1.0, max: 7.0 })
    .withMessage('Grade must be a number between 1 and 7'),

  validateFields,
];

module.exports = {
  createGradeValidator,
  updateGradeValidator,
};
