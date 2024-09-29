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
