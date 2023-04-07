const Log = require('../models/logModel');

/**
 * @desc   Get all logs
 * @route  GET /api/fitLog
 * @access Public
 */
const getLogs = async (req, res, next) => {
	try {
		const logs = await Log.find();
		return res.status(200).json({
			success: true,
			count: logs.length,
			data: logs,
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
 * @desc Create a log, an array of objects will be passed in and turned into a Map object to be stored in the database
 * @route  GET /api/fitLog/add
 * @access Public
 */
const addLog = async (req, res, next) => {
	// const exerciseMap = {
	// 	exercise1: {
	// 		weightUsed: 100,
	// 		repsDone: 10,
	// 		setsDone: 3,
	// 		name: 'Bench Press',
	// 		muscleGroup: 'Chest',
	// 	},
	// 	exercise2: {
	// 		weightUsed: 75,
	// 		repsDone: 8,
	// 		setsDone: 3,
	// 		name: 'Chest Fly',
	// 		muscleGroup: 'Chest',
	// 	},
	// };
	// const user = 'testUser';
	// an Array of objects will work for the exerciseMap value
	try {
		const log = await Log.create({
			exerciseMap: exerciseMap,
			user: user,
		});
		return res.status(201).json({
			success: true,
			data: log,
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
				message: err.message,
			});
		}
	}
};

module.exports = {
	getLogs,
	addLog,
};
