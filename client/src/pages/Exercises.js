import React, { useContext, useEffect } from "react";
import { UserContext } from "../components/UserContext";
import { ExerciseContext } from "../components/ExerciseContext";

function Exercises() {
	// not exactly sure why I can't just pull user from the UserContext,
	// but I can't. I have to pull the entire state object and then
	// destructure it to get the user object.
	const { ...state } = useContext(UserContext);
	const { user } = state;
	const { getExercises, exercises } = useContext(ExerciseContext);

	useEffect(() => {
		getExercises(user.token);
		console.log(exercises.data);
	}, []);

	return (
		<div>
			<h1>{user.name}'s Exercises</h1>
			<ul>
				{exercises.data.map((exercise, idx) => (
					<li key={idx}>{exercise.name}</li>
				))}
			</ul>
		</div>
	);
}

export default Exercises;
