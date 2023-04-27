import React, { useReducer } from "react";
import exerciseService from "../services/exerciseService";

export const ExerciseContext = React.createContext();

const initialState = {
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: "",
	exercises: [],
};

const exerciseReducer = (state, action) => {
	switch (action.type) {
		case "GET_EXERCISES":
			return {
				...state,
				isError: false,
				isSuccess: true,
				isLoading: false,
				message: "Exercises retrieved successfully",
				exercises: action.payload,
			};
		case "ADD_EXERCISE":
			return {
				...state,
				isError: false,
				isSuccess: true,
				isLoading: false,
				message: "Exercise added successfully",
				exercises: [...state.exercises, action.payload],
			};
		case "DELETE_EXERCISE":
			return {
				...state,
				isError: false,
				isSuccess: true,
				isLoading: false,
				message: "Exercise deleted successfully",
				exercises: state.exercises.filter(
					(exercise) => exercise.name !== action.payload
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
export const ExerciseContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(exerciseReducer, initialState);

	const getExercises = async (token) => {
		try {
			const exercises = await exerciseService.getExercises(token);
			dispatch({ type: "GET_EXERCISES", payload: exercises.data });
			console.log("getExercises", exercises.data);
			return exercises.data;
		} catch (error) {
			dispatch({ type: "ERROR", payload: error.message });
		}
	};

	const addExercise = async (data, token) => {
		try {
			const exercise = await exerciseService.addExercise(data, token);
			dispatch({ type: "ADD_EXERCISE", payload: exercise.data });
			console.log("addExercise", exercise.data);
			return exercise.data;
		} catch (error) {
			dispatch({ type: "ERROR", payload: error.message });
		}
	};

	const deleteExercise = async (data, token) => {
		try {
			const exercise = await exerciseService.deleteExercise(data, token);
			console.log("deleteExercise", data.name);
			dispatch({ type: "DELETE_EXERCISE", payload: data.name });
			return exercise.data;
		} catch (error) {
			dispatch({ type: "ERROR", payload: error.message });
		}
	};

	const value = {
		...state,
		dispatch,
		getExercises,
		addExercise,
		deleteExercise,
	};
	return (
		<ExerciseContext.Provider value={value}>
			{children}
		</ExerciseContext.Provider>
	);
};
