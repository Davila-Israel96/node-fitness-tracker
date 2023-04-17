import React, { useState, useEffect, useContext } from "react";
import UserContext from "../components/UserContext";
import { FaUser } from "react-icons/fa";

function Register() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		passwordConfirm: "",
	});
	const { registerUser } = useContext(UserContext);

	//destructure formData
	const { name, email, password, passwordConfirm } = formData;

	const infoChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const register = async (e) => {
		e.preventDefault();

		if (password !== passwordConfirm) {
			console.log("Passwords do not match");
		} else {
			registerUser(formData);
			console.log("Success");
		}
	};

	return (
		<>
			<section>
				<h1>
					<FaUser />
					Register
				</h1>
				<p>Please create an account</p>
			</section>
			<section>
				<form onSubmit={register}>
					<div>
						<input
							type="text"
							name="name"
							id="name"
							value={name}
							placeholder="enter your name"
							onChange={infoChange}
						/>
					</div>
					<div>
						<input
							type="text"
							name="email"
							id="email"
							value={email}
							placeholder="enter your email"
							onChange={infoChange}
						/>
					</div>
					<div>
						<input
							type="text"
							name="password"
							id="password"
							value={password}
							placeholder="enter your password"
							onChange={infoChange}
						/>
					</div>
					<div>
						<input
							type="text"
							name="passwordConfirm"
							id="passwordConfirm"
							value={passwordConfirm}
							placeholder="confirm your password"
							onChange={infoChange}
						/>
					</div>
					<div>
						<button type="submit" className="btn btn-success">
							Submit
						</button>
					</div>
				</form>
			</section>
		</>
	);
}

export default Register;
