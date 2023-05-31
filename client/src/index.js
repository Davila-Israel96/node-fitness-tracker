import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { UserContextProvider } from "./components/UserContext";
import { ExerciseContextProvider } from "./components/ExerciseContext";
import { LogsContextProvider } from "./components/LogsContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "animate.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<BrowserRouter>
		<UserContextProvider>
			<ExerciseContextProvider>
				<LogsContextProvider>
					<App />
				</LogsContextProvider>
			</ExerciseContextProvider>
		</UserContextProvider>
	</BrowserRouter>
);
