import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../components/UserContext";
import { ExerciseContext } from "../components/ExerciseContext";

function Exercises() {
	const [list, setList] = useState([]);
	// not exactly sure why I can't just pull user from the UserContext,
	// but I can't. I have to pull the entire state object and then
	// destructure it to get the user object.
	const { ...state } = useContext(UserContext);
	const { user } = state;
	const { getExercises } = useContext(ExerciseContext);

	const fetchExercises = async () => {
		try {
			const exercises = await getExercises(user.token);
			return exercises.data;
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		fetchExercises().then((data) => setList(data));
	}, []);

	return (
		<div>
			<h1>{user.name}'s Exercises</h1>
			<ul>
				{list.map((exercise, idx) => (
					<li key={idx}>{exercise.name}</li>
				))}
			</ul>
		</div>
	);
}

export default Exercises;
