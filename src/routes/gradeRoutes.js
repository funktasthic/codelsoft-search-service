const { Router } = require('express');

// Controllers
const { createGrades, getAllGrades, editGrade } = require('../controllers/gradeController');

// Validators

const router = Router();

router.get('/all', getAllGrades);

router.post('/create', createGrades);

router.put('/edit/:id', editGrade);

module.exports = router;
