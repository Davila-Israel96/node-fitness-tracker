import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';

function App() {
	const getExercises = () => {
		axios.get('http://localhost:3001/api/tracker').then((res) => {
			console.log(res.data);
		});
	};

	useEffect(() => {
		getExercises();
	}, []);

	return (
		<div className='App'>
			<header className='App-header'>
				<Navbar />
				<h1>Tracker</h1>
				<p></p>
			</header>
		</div>
	);
}

export default App;
