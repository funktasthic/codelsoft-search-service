const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validateFields');

const createUserValidator = [
  // Required
  check('name', 'Name is required').not().isEmpty(),
  check('lastName', 'Last name is required').not().isEmpty(),
  check('email', 'Email is required').not().isEmpty(),
  check('roleName', 'Role name is required').not().isEmpty(),

  // String
  check('name', 'Name must be a string').isString(),
  check('lastName', 'Last name must be a string').isString(),
  check('email', 'Email must be a string').isString(),
  check('roleName', 'Role name must be a string').isString(),

  // Min Length
  check('name').isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),

  check('lastName')
    .isLength({ min: 3 })
    .withMessage('Last name must be at least 3 characters long'),

  check('email').isLength({ min: 3 }).withMessage('Email must be at least 3 characters long'),

  // Max Length
  check('name').isLength({ max: 255 }).withMessage('Name must be no more than 255 characters long'),

  check('lastName')
    .isLength({ max: 255 })
    .withMessage('Last name must be no more than 255 characters long'),

  check('email')
    .isLength({ max: 255 })
    .withMessage('Email must be no more than 255 characters long'),

  validateFields,
];

const updateUserValidator = [
  // Required
  check('name', 'Name is required').not().isEmpty(),
  check('lastName', 'Last name is required').not().isEmpty(),
  check('email', 'Email is required').not().isEmpty(),
  check('roleName', 'Role name is required').not().isEmpty(),

  // String
  check('name', 'Name must be a string').isString(),
  check('lastName', 'Last name must be a string').isString(),
  check('email', 'Email must be a string').isString(),
  check('roleName', 'Role name must be a string').isString(),

  // Min Length
  check('name').isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),

  check('lastName')
    .isLength({ min: 3 })
    .withMessage('Last name must be at least 3 characters long'),

  check('email').isLength({ min: 3 }).withMessage('Email must be at least 3 characters long'),

  // Max Length
  check('name').isLength({ max: 255 }).withMessage('Name must be no more than 255 characters long'),

  check('lastName')
    .isLength({ max: 255 })
    .withMessage('Last name must be no more than 255 characters long'),

  check('email')
    .isLength({ max: 255 })
    .withMessage('Email must be no more than 255 characters long'),

  validateFields,
];

module.exports = { createUserValidator, updateUserValidator };
