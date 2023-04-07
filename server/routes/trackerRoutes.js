const express = require('express');
const router = express.Router();
const {
	getExercises,
	getExercise,
	addExercise,
	updateExercise,
	deleteExercise,
} = require('../controllers/trackerController');

router.get('/', getExercises);

router.post('/add', addExercise);

router.put('/update', updateExercise);

router.delete('/delete', deleteExercise);

module.exports = router;
