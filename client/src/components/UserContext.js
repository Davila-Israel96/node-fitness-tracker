import React, { useReducer } from "react";
import authService from "../services/authService";

export const UserContext = React.createContext();

const userReducer = (state, action) => {
	switch (action.type) {
		case "LOGIN":
			return {
				...state,
				isError: false,
				isSuccess: true,
				isLoading: false,
				message: "Login successful",
				user: action.payload,
			};
		case "LOGOUT":
			return {
				...state,
				user: null,
				isError: false,
				isSuccess: true,
				isLoading: false,
				message: "Logout successful",
			};
		case "REGISTER":
			return {
				...state,
				user: action.payload,
				isError: false,
				isSuccess: true,
				isLoading: false,
				message: "Registration successful",
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

//Get user from localStorage
const user = "";

const initialState = {
	user: user ? user : null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: "",
};

export const UserContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(userReducer, initialState);

	async function registerUser(userData) {
		try {
			const response = await authService.register(userData);
			if (response) {
				dispatch({ type: "REGISTER", payload: response });
			}
		} catch (error) {
			dispatch({ type: "ERROR", payload: error.message });
			console.log(error);
		}
	}

	const value = { registerUser, ...state };
	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
export default UserContext;
