import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../components/UserContext";
import { ExerciseContext } from "../components/ExerciseContext";
import AddExercise from "../components/AddExercise";
import FilterExercises from "../utils/FilterExercises";
import GroupCard from "../components/GroupCard";

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
			const fetchedExercises = await getExercises(user.token);
			return fetchedExercises;
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		// if the exercises array is empty, they must be initialized
		if (list.length === 0) {
			fetchExercises().then((results) => {
				const filteredList = FilterExercises(results);
				setList(filteredList);
			});
		}
		// if the exercises array is not empty, they must have been updated
		else {
			const filteredList = FilterExercises(exercises);
			setList(filteredList);
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
					{list.length === 0 ? (
						<h2>Loading...</h2>
					) : (
						<div>
							<div className="d-flex justify-content-around my-3">
								<GroupCard exercises={list.Chest} title={"Chest"} />
								<GroupCard exercises={list.Arms} title={"Arms"} />
								<GroupCard exercises={list.Shoulders} title={"Shoulders"} />
							</div>
							<div className="d-flex justify-content-around my-3">
								<GroupCard exercises={list.Legs} title={"Legs"} />
								<GroupCard exercises={list.Back} title={"Back"} />
								<GroupCard exercises={list.Core} title={"Core"} />
							</div>
						</div>
					)}
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
