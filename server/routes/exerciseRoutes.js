const express = require("express");
const router = express.Router();
const {
	getExercises,
	getExercise,
	addExercise,
	updateExercise,
	deleteExercise,
} = require("../controllers/exerciseController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getExercises);

router.get("/find", protect, getExercise);

router.post("/add", protect, addExercise);

router.put("/update", protect, updateExercise);

router.delete("/delete", protect, deleteExercise);

module.exports = router;
