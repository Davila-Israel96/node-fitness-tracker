const FilterExercises = (exercises) => {
	const filteredList = {
		Arms: [],
		Back: [],
		Chest: [],
		Shoulders: [],
		Core: [],
		Legs: [],
	};

	for (let i = 0; i < exercises.length; i++) {
		const exercise = exercises[i];
		if (filteredList[exercise.muscleGroup] === undefined) {
			continue;
		}
		filteredList[exercise.muscleGroup].push(exercise);
	}
	return filteredList;
};
export default FilterExercises;
