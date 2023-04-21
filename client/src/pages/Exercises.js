import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../components/UserContext';
import { ExerciseContext } from '../components/ExerciseContext';

function Exercises() {
	const { user } = useContext(UserContext);
	const { getExercises, exercises } = useContext(ExerciseContext);

	useEffect(() => {
		const getExercisesForUser = async () => {
			await getExercises(user.token);
			console.log(exercises);
		};
		getExercisesForUser();
	}, []);

	return (
		<div>
			<h1>{user.name}'s Exercises</h1>
			{/* <ul>
				{exercises.map((exercise, idx) => (
					<li key={idx}>{exercise.name}</li>
				))}
			</ul> */}
		</div>
	);
}

export default Exercises;
