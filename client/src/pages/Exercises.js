import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../components/UserContext";
import { ExerciseContext } from "../components/ExerciseContext";
import AddExercise from "../components/AddExercise";
import { Card } from "../components/Card";

function Exercises() {
	const [list, setList] = useState([]);
	const [addForm, setAddForm] = useState(false);
	// not exactly sure why I can't just pull user from the UserContext,
	// but I can't. I have to pull the entire state object and then
	// destructure it to get the user object.
	const { ...state } = useContext(UserContext);
	const { user } = state;
	const { getExercises, exercises } = useContext(ExerciseContext);

	const fetchExercises = async () => {
		try {
			const exercises = await getExercises(user.token);
			return exercises;
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		// if the exercises array is empty, they must be initialized
		if (list.length === 0) {
			fetchExercises().then((data) => setList(data));
		}
		// if the exercises array is not empty, they must have been updated
		else {
			setList(exercises);
		}
	}, [exercises]);

	return (
		<div className="text-center mx-auto my-5">
			{addForm ? (
				<AddExercise setAddForm={setAddForm} />
			) : (
				<div
					className={
						addForm
							? "animate__animated animate__backOutLeft"
							: "animate__animated animate__backInRight"
					}>
					<h1>{user.name}'s Exercises</h1>
					<ul className="list-group">
						{list.map((exercise, idx) => (
							<li className="text-center list-group-item" key={idx}>
								{exercise.name}
							</li>
						))}
					</ul>
					<button
						className="btn btn-success mt-3"
						type="button"
						onClick={() => setAddForm(true)}>
						Add Exercise
					</button>
				</div>
			)}
		</div>
	);
}

export default Exercises;
