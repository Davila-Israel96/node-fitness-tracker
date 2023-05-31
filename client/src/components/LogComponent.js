import React, { useState, useEffect } from "react";

function LogComponent({ props }) {
	const [exercises, setExercises] = useState([]);

	const convertToArray = () => {
		var exerciseMap = Object.keys(props).map((key) => {
			return props[key];
		});
		setExercises(exerciseMap);
	};

    useEffect(() => {
        convertToArray();
    }, [])
	console.log("props", props);
	return (
		<div className="list-group">
			{exercises.map((log) => {
				return (
					<div className="list-group-item">
						<h6 className="mb-1">{log.name}</h6>
						<ul>
							<li>Sets: {log.setsDone}</li>
							<li>Reps: {log.repsDone}</li>
							<li>Weight: {log.weightUsed}</li>
						</ul>
					</div>
				);
			})}
		</div>
	);
}

export default LogComponent;
