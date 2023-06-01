const mongoose = require("mongoose");

// const exerciseSchema = new mongoose.Schema(
// 	{
// 		name: {
// 			type: String,
// 			required: [true, "Please add a name"],
// 		},
// 		muscleGroup: {
// 			type: String,
// 			required: [true, "Please add a muscle group"],
// 		},
// 		setsDone: {
// 			type: Number,
// 		},
// 		repsDone: {
// 			type: Number,
// 		},
// 		weightUsed: {
// 			type: Number,
// 		},
// 	},
// 	{ _id: false }
// );

// logSchema is a Map of exerciseSchema, so we'll be able to iterate through the map and access the exerciseSchema properties
const logSchema = new mongoose.Schema({
	logName: {
		type: String,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	exerciseMap: [
		{
			name: String,
			muscleGroup: String,
			setsDone: Number,
			repsDone: Number,
			weightUsed: Number,
		},
	],
	user: {
		type: String,
	},
});

module.exports = mongoose.model("Log", logSchema);
