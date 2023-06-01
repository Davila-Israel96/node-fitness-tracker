import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import { LogsContext } from "../components/LogsContext";
import { UserContext } from "../components/UserContext";

function AddLog({ setAddLog }) {
	const { addLog } = useContext(LogsContext);
	const { ...state } = useContext(UserContext);
	const { user } = state;

	const [logsList, setLogsList] = useState([]);
	const [logName, setLogName] = useState("");
	const [input, setInput] = useState({
		name: "",
		muscleGroup: "Arms",
		setsDone: 0,
		repsDone: 0,
		weightUsed: 0,
	});

	const onSubmit = async (e) => {
		e.preventDefault();
		const response = await addLog(logName, logsList, user.token);
		if (response) {
			toast.success("Log added successfully!");
			setAddLog(false);
		}
	};

	// add the workout to the list and clear the form
	const addToList = (e) => {
		e.preventDefault();
		setLogsList([...logsList, input]);
		setInput({
			name: "",
			muscleGroup: "Arms",
			setsDone: 0,
			repsDone: 0,
			weightUsed: 0,
		});
	};

	const handleChange = (e) => {
		e.preventDefault();
		setInput({ ...input, [e.target.name]: e.target.value });
	};

	const { name, muscleGroup, setsDone, repsDone, weightUsed } = input;
	return (
		<div className="animate__animated animate__backInRight mx-auto card w-50">
			<h1 className="card-header">Add A Log</h1>
			<form id="logForm" className="card-body" onSubmit={onSubmit}>
				<div className="mb-3">
					<label htmlFor="logName" className="col-form-label">
						Log Name:
					</label>
					<input
						type="text"
						className="form-control w-50 mx-auto"
						value={logName}
						id="logName"
						name="logName"
						onChange={(e) => setLogName(e.target.value)}
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="name" className="col-form-label">
						Exercise Name:
					</label>
					<input
						type="text"
						className="form-control w-50 mx-auto"
						value={name}
						id="name"
						name="name"
						onChange={handleChange}
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="muscleGroup">
						<strong>Muscle Group</strong>
					</label>
					<section>
						<select
							id="muscleGroup"
							name="muscleGroup"
							valuer={muscleGroup}
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
				</div>
				<div className="mb-3">
					<label htmlFor="setsDone" className="col-form-label">
						Sets Done:
					</label>
					<input
						type="number"
						className="form-control w-50 mx-auto"
						value={setsDone}
						id="setsDone"
						name="setsDone"
						onChange={handleChange}
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="repsDone" className="col-form-label">
						Reps Done:
					</label>
					<input
						type="number"
						className="form-control w-50 mx-auto"
						value={repsDone}
						id="repsDone"
						name="repsDone"
						onChange={handleChange}
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="weightUsed" className="col-form-label">
						Weight Used:
					</label>
					<input
						type="number"
						className="form-control w-50 mx-auto"
						value={weightUsed}
						id="weightUsed"
						name="weightUsed"
						onChange={handleChange}
					/>
				</div>
				<button type="button" className="btn btn-success" onClick={addToList}>
					Add
				</button>
				<button type="submit" className="btn btn-primary">
					Submit
				</button>
			</form>
		</div>
	);
}

export default AddLog;
