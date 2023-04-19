import axios from "axios";

const API_URL = "/api/users/";

// Register a new user
const register = async (userData) => {
	const response = await axios.post(API_URL + "register", userData);

	if (response.data) {
		localStorage.setItem("user", JSON.stringify(response.data));
	}

	return response.data;
};

// Login user
const loginUser = async (userData) => {
	const response = await axios.post(API_URL + "login", userData);

	if (response.data) {
		localStorage.setItem("user", JSON.stringify(response.data));
	}

	return response.data;
};

// Logout a user
const logoutUser = () => {
	localStorage.removeItem("user");
};

const authService = {
	register,
	logoutUser,
	loginUser,
};

export default authService;
