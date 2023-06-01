import React, { useReducer } from "react";
import logsService from "../services/logsService";

export const LogsContext = React.createContext();

const initialState = {
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: "",
	logs: [],
};

const logsReducer = (state, action) => {
	switch (action.type) {
		case "GET_LOGS":
			return {
				...state,
				isError: false,
				isSuccess: true,
				isLoading: false,
				message: "Logs retrieved successfully",
				logs: action.payload,
			};
		case "ADD_LOG":
			return {
				...state,
				isError: false,
				isSuccess: true,
				isLoading: false,
				message: "Log added successfully",
				logs: [...state.logs, action.payload],
			};
		case "DELETE_LOG":
			return {
				...state,
				isError: false,
				isSuccess: true,
				isLoading: false,
				message: "Log deleted successfully",
				logs: state.logs.filter((log) => log._id !== action.payload._id),
			};
		case "UPDATE_LOG":
			return {
				...state,
				isError: false,
				isSuccess: true,
				isLoading: false,
				message: "Log updated successfully",
				logs: state.logs.map((log) =>
					log._id === action.payload._id ? action.payload : log
				),
			};
		case "ERROR":
			return {
				...state,
				isError: true,
				isSuccess: false,
				isLoading: false,
				message: action.payload,
			};
		default:
			return state;
	}
};
export const LogsContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(logsReducer, initialState);

	const getLogs = async (token) => {
		try {
			const logs = await logsService.getLogs(token);
			dispatch({ type: "GET_LOGS", payload: logs.data });
			console.log("getLogs", logs.data);
			return logs.data;
		} catch (err) {
			dispatch({ type: "ERROR", payload: err.message });
			console.log("getLogs error", err.message);
		}
	};

	const addLog = async (logName, data, token) => {
		try {
			var toServer = {
				logName: logName,
				exerciseMap: data,
			};
			const response = await logsService.addLog(toServer, token);
			dispatch({ type: "ADD_LOG", payload: response.data });
			console.log("addLog", response.data);
			return response.data;
		} catch (err) {
			dispatch({ type: "ERROR", payload: err.message });
			console.log("addLog error", err.message);
		}
	};

	const value = {
		...state,
		getLogs,
		addLog,
	};
	return <LogsContext.Provider value={value}>{children}</LogsContext.Provider>;
};
