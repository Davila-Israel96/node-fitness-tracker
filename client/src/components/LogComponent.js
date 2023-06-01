import React, { useState, useEffect } from "react";

function LogComponent({ props }) {
	console.log("props", props);
	return (
		<div className="text-center">
			{props.map((log) => {
				return (
					<>
						<h6 className="my-3 fw-bold">{log.name}</h6>
						<ul className="list-group my-2 w-50 mx-auto">
							<li className="list-group-item">Sets: {log.setsDone}</li>
							<li className="list-group-item">Reps: {log.repsDone}</li>
							<li className="list-group-item">Weight: {log.weightUsed}</li>
						</ul>
					</>
				);
			})}
		</div>
	);
}

export default LogComponent;
