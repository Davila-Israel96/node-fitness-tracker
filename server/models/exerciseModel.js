const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema({
	user: {
		type: String,
		required: [true, "Exercise must have user associoated with it"],
	},
	name: {
		type: String,
		required: [true, "Please add a name"],
	},
	muscleGroup: {
		type: String,
		required: [true, "Please add a muscle group"],
	},
});

module.exports = mongoose.model("Exercise", exerciseSchema);
