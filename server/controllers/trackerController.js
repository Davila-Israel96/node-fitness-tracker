const Exercise = require('../models/exerciseModel');

/**
 * @desc   Get all exercises
 * @route  GET /api/tracker
 * @access Public
 */
const getExercises = async (req, res, next) => {
	try {
		const exercises = await Exercise.find();
		return res.status(200).json({
			success: true,
			count: exercises.length,
			data: exercises,
		});
	} catch (err) {
		return res.status(500).json({
			success: false,
			error: 'Server Error',
		});
	}
};
/**
 * @desc   Create an exercise
 * @route  POST /api/tracker/add
 * @access Public
 */
const addExercise = async (req, res, next) => {
	try {
		if (!req.body.name || !req.body.muscleGroup) {
			return res.status(400).json({
				success: false,
				error: 'Please provide a name and muscle group',
			});
		}
		const exercise = await Exercise.create({
			name: req.body.name,
			muscleGroup: req.body.muscleGroup,
		});
		return res.status(201).json({
			success: true,
			data: exercise,
		});
	} catch (err) {
		if (err.name === 'ValidationError') {
			const messages = Object.values(err.errors).map((val) => val.message);
			return res.status(400).json({
				success: false,
				error: messages,
			});
		} else {
			return res.status(500).json({
				success: false,
				error: 'Server Error',
			});
		}
	}
};
/**
 * @desc   Update an exercise
 * @route  PUT /api/tracker/update
 * @access Public
 */
const updateExercise = async (req, res, next) => {
	const name = req.body.name;
	const muscleGroup = req.body.muscleGroup;
	try {
		const exercise = await Exercise.updateOne(
			{ name: name },
			{ $set: { muscleGroup: muscleGroup } }
		);
		return res.status(200).json({
			success: true,
			data: exercise,
		});
	} catch (err) {
		return res.status(500).json({
			success: false,
			error: 'Server Error',
			message: err.message,
		});
	}
};
/**
 * @desc   Delete an exercise
 * @route  Delete /api/tracker/delete
 * @access Public
 */
const deleteExercise = async (req, res, next) => {
	const name = req.body.name;
	try {
		const exercise = await Exercise.deleteOne({ name: name });
		return res.status(200).json({
			success: true,
			data: exercise,
		});
	} catch (err) {
		return res.status(500).json({
			success: false,
			error: 'Server Error',
			message: err.message,
		});
	}
};

module.exports = {
	getExercises,
	addExercise,
	updateExercise,
	deleteExercise,
};
