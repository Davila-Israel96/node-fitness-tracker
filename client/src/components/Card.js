import React from "react";

function Card(props) {
	return (
		<div className="card">
			<h1 className="card-header">{props.title}</h1>
			<div className="card-body">
				<ul>
					{props.exercises.map((exercise, idx) => (
						<li className="text-center list-group-item" key={idx}>
							{exercise.name}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default Card;
