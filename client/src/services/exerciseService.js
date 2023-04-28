import axios from "axios";

const API_URL = "/api/exercises/";

// Get all exercises for logged in user
export const getExercises = async (token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	// GET request doesn't support body, so we need to pass the user as a query parameter
	const response = await axios.get(API_URL, config);
	return response.data;
};

// Get a specific exercise for logged in user
const getExercise = async (data) => {
	const config = {
		headers: {
			Authorization: `Bearer ${data.token}`,
		},
	};

	const response = await axios.get(API_URL + "/find", config);

	return response.data;
};

// Add an exercise for logged in user
const addExercise = async (data, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const response = await axios.post(API_URL + "/add", data, config);
	return response.data;
};

const deleteExercise = async (data, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
		data: data,
	};
	const response = await axios.delete(API_URL + "/delete", config);
	return response.data;
};

const updateExercise = async (data, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const response = await axios.post(API_URL + "/update", data, config);
	return response.data;
};

const exerciseService = {
	getExercises,
	getExercise,
	addExercise,
	deleteExercise,
	updateExercise,
};

export default exerciseService;
