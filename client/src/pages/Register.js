import React, { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";

function Register() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		password_confirm: "",
	});

	//destructure formData
	const { name, email, password, password_confirm } = formData;

	const infoChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	return (
		<>
			<section>
				<h1>
					<FaUser />
					Register
				</h1>
			</section>
		</>
	);
}

export default Register;
