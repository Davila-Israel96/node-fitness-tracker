const Exercise = require("../models/exerciseModel");

/**
 * @desc   Get all exercises for associated user
 * @route  GET /api/exercises/:user
 * @access Public
 */
const getExercises = async (req, res, next) => {
	const user = req.user.name;
	try {
		const exercises = await Exercise.find({ user: user });
		return res.status(200).json({
			success: true,
			count: exercises.length,
			data: exercises,
		});
	} catch (err) {
		return res.status(500).json({
			success: false,
			error: "Server Error",
		});
	}
};

/**
 * @desc   Get all exercises
 * @route  GET /api/exercises/:user/:name
 * @access Public
 */
const getExercise = async (req, res, next) => {
	const user = req.body.user;
	const name = req.body.name;
	try {
		const exercise = await Exercise.find({
			user: user,
			name: name,
		});
		if (!exercise) {
			return res.status(404).json({
				success: false,
				error: "No exercise found",
			});
		}
		return res.status(200).json({
			success: true,
			data: exercise,
		});
	} catch (err) {
		return res.status(500).json({
			success: false,
			error: "Server Error",
		});
	}
};
/**
 * @desc   Create an exercise
 * @route  POST /api/exercises/add
 * @access Public
 */
const addExercise = async (req, res, next) => {
	try {
		if (!req.body.name || !req.body.muscleGroup) {
			return res.status(400).json({
				success: false,
				error: "Please provide a name and muscle group",
			});
		}
		const exercise = await Exercise.create({
			user: req.body.user,
			name: req.body.name,
			muscleGroup: req.body.muscleGroup,
		});
		return res.status(201).json({
			success: true,
			data: exercise,
		});
	} catch (err) {
		if (err.name === "ValidationError") {
			const messages = Object.values(err.errors).map((val) => val.message);
			return res.status(400).json({
				success: false,
				error: messages,
			});
		} else {
			return res.status(500).json({
				success: false,
				error: "Server Error",
			});
		}
	}
};
/**
 * @desc   Update an exercise
 * @route  PUT /api/exercises/update
 * @access Public
 */
const updateExercise = async (req, res, next) => {
	const name = req.body.name;
	const user = req.body.user;
	const muscleGroup = req.body.muscleGroup;
	try {
		// only name and muscleGroup can be updated
		const exercise = await Exercise.updateOne(
			{ name: name, user: user },
			{ name: name, muscleGroup: muscleGroup }
		);
		return res.status(200).json({
			success: true,
			data: exercise,
		});
	} catch (err) {
		return res.status(500).json({
			success: false,
			error: "Server Error",
			message: err.message,
		});
	}
};
/**
 * @desc   Delete an exercise
 * @route  Delete /api/exercises/delete
 * @access Public
 */
const deleteExercise = async (req, res, next) => {
	const name = req.body.name;
	const user = req.body.user;
	try {
		const exercise = await Exercise.deleteOne({ name: name, user: user });
		return res.status(200).json({
			success: true,
			data: exercise,
		});
	} catch (err) {
		return res.status(500).json({
			success: false,
			error: "Server Error",
			message: err.message,
		});
	}
};

module.exports = {
	getExercises,
	getExercise,
	addExercise,
	updateExercise,
	deleteExercise,
};
