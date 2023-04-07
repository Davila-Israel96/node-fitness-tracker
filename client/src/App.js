import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
	const getExercises = () => {
		axios.get("http://localhost:3001/api/tracker").then((res) => {
			console.log(res.data);
		});
	};

	useEffect(() => {
		getExercises();
	}, []);

	return (
		<div className="App">
			<header className="App-header">
				<h1>Tracker</h1>
				<p></p>
			</header>
		</div>
	);
}

export default App;
