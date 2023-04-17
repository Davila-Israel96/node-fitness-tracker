import { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";

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
			<Navbar />
			<Routes>
				<Route path="/" element={<Register />} />
			</Routes>
		</div>
	);
}

export default App;
