import React, { useContext, useState, useEffect } from "react";
import { LogsContext } from "../components/LogsContext";
import { UserContext } from "../components/UserContext";
import CollapseCard from "../components/CollapseCard";
import LogComponent from "../components/LogComponent";
import convertDate from "../utils/convertDate";
import AddLog from "./AddLog";

function Logs() {
	const [userLogs, setUserLogs] = useState([]);
	const [addLog, setAddLog] = useState(false);
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
			setUserLogs(logs.map((log) => log));
		}
	}, [logs]);

	return (
		<div className="text-center mx-auto my-5 container">
			{addLog ? (
				<AddLog setAddLog={setAddLog} />
			) : (
				<div>
					<h2>{user.name}'s Logs</h2>
					{userLogs.length === 0 ? (
						<h2>Loading...</h2>
					) : (
						userLogs.map((log) => {
							return (
								<CollapseCard title={convertDate(log.date)} name={log.logName}>
									<LogComponent props={log.exerciseMap} />
								</CollapseCard>
							);
						})
					)}
				</div>
			)}
			<button
				className="btn btn-primary mt-3"
				type="button"
				onClick={() => setAddLog(true)}>
				Add Log
			</button>
		</div>
	);
}

export default Logs;
