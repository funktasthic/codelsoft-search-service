const { Router } = require('express');

// Controllers
const {
  createGrade,
  getAllGrades,
  getGrade,
  deleteGrade,
  updateGrade,
} = require('../controllers/gradeController');

// Validators
const { createGradeValidator, updateGradeValidator } = require('../validators/gradeValidator');

const router = Router();

// Get all grades
router.get('/all', getAllGrades);

// Get grade
router.get('/:id', getGrade);

// Create grade
router.post('/create', [createGradeValidator], createGrade);

// Update grade
router.put('/update/:id', [updateGradeValidator], updateGrade);

// Delete grade
router.delete('/:id', deleteGrade);

module.exports = router;
