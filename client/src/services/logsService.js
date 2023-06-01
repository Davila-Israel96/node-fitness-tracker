import axios from "axios";

const API_URL = "/api/fitLog";

export const getLogs = async (token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const response = await axios.get(API_URL, config);
	return response.data;
};

export const addLog = async (data, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const response = await axios.post(API_URL + "/add", data, config);
	return response.data;
};

const logsService = {
	getLogs,
	addLog,
};

export default logsService;
