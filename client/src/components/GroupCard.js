import React, { useContext, useState } from "react";
import { ExerciseContext } from "./ExerciseContext";
import { UserContext } from "./UserContext";
import Exercise from "./Exercise";
import { toast } from "react-toastify";

function GroupCard({ title, exercises }) {
	const { ...state } = useContext(UserContext);
	const { user } = state;
	const { deleteExercise } = useContext(ExerciseContext);
	const [editView, setEditView] = useState(false);

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
	// create an exercise component with all the options within it. Duh.
	return (
		<div className="card mx-auto w-25">
			<h1 className="card-header">{title}</h1>
			<h6 className="card-subtitle text-muted mt-1 row">
				<p className="col-4 text-center">Added</p>
				<p className="col-4 text-center">Exercise</p>
				<p className="col-4 text-center">Edit</p>
			</h6>
			<div className="card-body">
				{exercises === undefined ? (
					<></>
				) : (
					<ul>
						{exercises.map((exercise, idx) => {
							return (
								<li className="list-unstyled align-items-center" key={idx}>
									<Exercise props={exercise} />
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
