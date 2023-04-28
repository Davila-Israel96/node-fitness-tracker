import React, { useContext, useState } from "react";
import { ExerciseContext } from "./ExerciseContext";
import { UserContext } from "./UserContext";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { toast } from "react-toastify";
import EditExercise from "./EditExercise";

function GroupCard({ title, exercises }) {
	const { ...state } = useContext(UserContext);
	const { user } = state;
	const { deleteExercise } = useContext(ExerciseContext);
	const [editView, setEditView] = useState(false);
	const [input, setInput] = useState({
		name: "",
		muscleGroup: "Arms",
		user: user.name,
	});

	const deleteListItem = async (name) => {
		const data = {
			name: name,
			user: user.name,
		};
		try {
			console.log(data, user.token);
			const response = await deleteExercise(data, user.token);
			console.log(response);
		} catch (error) {
			console.log(error);
		}
		toast.success("Exercise deleted");
	};

	return (
		<div className="card mx-auto w-25">
			<h1 className="card-header">{title}</h1>
			<div className="card-body">
				{exercises === undefined ? (
					<></>
				) : (
					<ul>
						{exercises.map((exercise, idx) => {
							return (
								<li className="d-flex justify-content-between" key={idx}>
									{exercise.name}
									<button
										className="btn btn-sm text-primary"
										onClick={() => setEditView(true)}>
										Edit
									</button>
									<button
										className="btn btn-sm text-danger"
										onClick={() => deleteListItem(exercise.name)}>
										<RiDeleteBin2Fill />
									</button>
									{editView ? (
										<input className="form-control w-50 mx-auto" type="text">
											{exercise.name}
										</input>
									) : (
										<></>
									)}
								</li>
							);
						})}
					</ul>
				)}
			</div>
		</div>
	);
}

export default GroupCard;
