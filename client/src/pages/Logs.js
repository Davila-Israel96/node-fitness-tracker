import React, { useContext, useState, useEffect } from "react";
import { LogsContext } from "../components/LogsContext";
import { UserContext } from "../components/UserContext";
import CollapseCard from "../components/CollapseCard";
import LogComponent from "../components/LogComponent";

function Logs() {
	const [userLogs, setUserLogs] = useState([]);
	const { logs, getLogs } = useContext(LogsContext);
	const { ...state } = useContext(UserContext);
	const { user } = state;

	const fetchLogs = async () => {
		try {
			const fetchedLogs = await getLogs(user.token);
			console.log("fetchedLogs", fetchedLogs);
			return fetchedLogs;
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (userLogs.length === 0) {
			fetchLogs().then((results) => {
				setUserLogs(results.map((log) => log));
			});
		} else {
			setUserLogs(logs);
		}
	}, []);

	return (
		<div className="container">
			{userLogs.length === 0 ? (
				<h2>Loading...</h2>
			) : (
				userLogs.map((log) => {
					return (
						<CollapseCard title={log.date} open>
							<LogComponent props={log.exerciseMap} />
						</CollapseCard>
					);
				})
			)}
		</div>
	);
}

export default Logs;
