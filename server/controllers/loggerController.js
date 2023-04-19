const Log = require("../models/logModel");
const User = require("../models/usersModel");
/**
 * @desc   Get all logs
 * @route  GET /api/fitLog
 * @access Public
 */
const getLogs = async (req, res, next) => {
	try {
		// get users logs
		const logs = await Log.find({ user: req.user.id });
		return res.status(200).json({
			success: true,
			count: logs.length,
			data: logs,
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
 * @desc Create a log, an array of objects will be passed in and turned into a Map object to be stored in the database
 * @route  GET /api/fitLog/add
 * @access Public
 */
const addLog = async (req, res, next) => {
	// an Array of objects will work for the exerciseMap value
	try {
		const log = await Log.create({
			exerciseMap: req.body.exerciseMap,
			user: req.user.id,
		});
		return res.status(201).json({
			success: true,
			data: log,
		});
	} catch (err) {
		if (err.name === "ValidationError") {
			const messages = Object.values(err.errors).map((val) => val.message);
			return res.status(400).json({
				success: false,
				error: messages,
				stack: err.stack,
			});
		} else {
			return res.status(500).json({
				success: false,
				error: "Server Error",
				message: err.message,
			});
		}
	}
};

/**
 * @desc Update a log, right now the entire log is replaced with whatever is passed in
 * I will update the desired fields.
 * @route  PUT /api/fitLog/update:id
 * @access Public
 */
const updateLog = async (req, res, next) => {
	// an Array of objects will work for the exerciseMap value
	try {
		const log = await Log.findById(req.params.id);
		if (!log) {
			res.status(400);
			throw new Error("Log not found");
		}

		// check for user
		if (!req.user) {
			res.status(401);
			throw new Error("User not found");
		}
		// ensure logged in user is the owner of the log
		if (log.user.toString() !== req.user.id) {
			res.status(401);
			throw new Error("User not authorized");
		}
		const updatedLog = await Log.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});

		res.status(200).json({ message: "updated", data: updatedLog });
	} catch (err) {
		if (err.name === "ValidationError") {
			const messages = Object.values(err.errors).map((val) => val.message);
			return res.status(400).json({
				success: false,
				error: messages,
				stack: err.stack,
			});
		} else {
			return res.status(500).json({
				success: false,
				error: "Server Error",
				message: err.message,
			});
		}
	}
};

/**
 * @desc Delete a log
 * @route  DELETE /api/fitLog/delete:id
 * @access Public
 */
const deleteLog = async (req, res, next) => {
	try {
		const log = await Log.findById(req.params.id);
		if (!log) {
			res.status(400);
			throw new Error("Log not found");
		}

		// check for user
		if (!req.user) {
			res.status(401);
			throw new Error("User not found");
		}
		// ensure logged in user is the owner of the log
		if (log.user.toString() !== req.user.id) {
			res.status(401);
			throw new Error("User not authorized");
		}
		const deletedLog = await Log.findByIdAndDelete(req.params.id);
		res.status(200).json({ mesage: "deleted", data: deletedLog });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

module.exports = {
	getLogs,
	addLog,
	updateLog,
	deleteLog,
};
