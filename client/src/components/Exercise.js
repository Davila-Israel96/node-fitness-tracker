import React, { useContext, useState } from "react";
import { ExerciseContext } from "./ExerciseContext";
import { RiDeleteBin2Fill } from "react-icons/ri";
/**
 * @desc component for exercise to be shown in list,
 * can be edited or deleted by logged in user
 * */
function Exercise({ props }) {
	const [editView, setEditView] = useState(false);
	const { deleteExercise, updateExercise } = useContext(ExerciseContext);

	return (
		<div className="row">
			{editView ? (
				<></>
			) : (
				<>
					<p className="col-4 my-auto">{props.name}</p>
					<p className="col-6 my-auto">{typeof props.createdAt}</p>
					<button
						type="button"
						className="btn btn-primary btn-sm col-2 my-auto"
						onClick={() => setEditView(true)}>
						Edit
					</button>
				</>
			)}
		</div>
	);
}

export default Exercise;
