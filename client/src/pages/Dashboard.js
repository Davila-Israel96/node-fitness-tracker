import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../components/UserContext";

function Dashboard() {
	const navigate = useNavigate();
	const { user } = useContext(UserContext);

	useEffect(() => {
		if (!user) {
			navigate("/login");
		}
	}, [user, navigate]);

	return <div>Dashboard</div>;
}

export default Dashboard;
