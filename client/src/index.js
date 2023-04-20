import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { UserContextProvider } from "./components/UserContext";
import { ExerciseContextProvider } from "./components/ExerciseContext";
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<BrowserRouter>
		<UserContextProvider>
			<ExerciseContextProvider>
				<App />
			</ExerciseContextProvider>
		</UserContextProvider>
	</BrowserRouter>
);
