import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import { ExerciseContext } from "../components/ExerciseContext";
import { UserContext } from "../components/UserContext";

function AddExercise({ setAddForm }) {
	const { addExercise } = useContext(ExerciseContext);
	const { ...state } = useContext(UserContext);
	const { user } = state;
	const [input, setInput] = useState({
		name: "",
		muscleGroup: "",
		user: user.name,
	});

	const onSubmit = async (e) => {
		e.preventDefault();
		const response = await addExercise(input, user.token);
		if (response) {
			toast.success("Exercise added successfully!");
			setAddForm(false);
		}
	};
	const handleChange = (e) => {
		e.preventDefault();
		setInput({ ...input, [e.target.name]: e.target.value });
	};
	const { name, muscleGroup } = input;
	return (
		<div className="animate__animated animate__backInRight mx-auto card w-50">
			<h1 className="card-header">Add An Exercise</h1>
			<form className="card-body" onSubmit={onSubmit}>
				<div className="mb-3">
					<label htmlFor="exercise-name" className="col-form-label">
						Exercise Name:
					</label>
					<input
						type="text"
						className="form-control w-50 mx-auto"
						value={name}
						id="name"
						name="name"
						onChange={handleChange}></input>
				</div>
				<div className="mb-3">
					<label htmlFor="muscleGroup">
						<strong>Muscle Group</strong>
					</label>
					<section>
						<select
							id="muscleGroup"
							name="muscleGroup"
							value={muscleGroup}
							onChange={handleChange}>
							<option value={"Arms"} className="dropdown-item">
								Arms
							</option>
							<option value={"Chest"} className="dropdown-item">
								Chest
							</option>
							<option value={"Legs"} className="dropdown-item">
								Legs
							</option>
							<option value={"Back"} className="dropdown-item">
								Back
							</option>
							<option value={"Shoulders"} className="dropdown-item">
								Shoulders
							</option>
							<option value={"Core"} className="dropdown-item">
								Core
							</option>
						</select>
					</section>
					<button className="btn btn-success mt-3" type="submit">
						Submit
					</button>
				</div>
			</form>
		</div>
	);
}

export default AddExercise;
