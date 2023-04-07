const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Please add a name'],
	},
	muscleGroup: {
		type: String,
		required: [true, 'Please add a muscle group'],
	},
	setsDone: {
		type: Number,
	},
	repsDone: {
		type: Number,
	},
	weightUsed: {
		type: Number,
	},
});

// logSchema is a Map of exerciseSchema, so we'll be able to iterate through the map and access the exerciseSchema properties
const logSchema = new mongoose.Schema({
	date: {
		type: Date,
		default: Date.now,
	},
	exerciseMap: {
		type: Map,
		of: exerciseSchema,
	},
	user: {
		type: String,
	},
});

module.exports = mongoose.model('Log', logSchema);
