import React, { useState, useEffect, useContext } from "react";
import UserContext from "../components/UserContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";

function Login() {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const { loginUser, ...state } = useContext(UserContext);
	const { user, isError, isSuccess, message, isLoading } = state;

	//destructure formData
	const { email, password } = formData;

	const infoChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const login = async (e) => {
		e.preventDefault();

		if (password === "") {
			toast.warn("Please enter a password >:(");
		} else {
			loginUser(formData);
		}
	};

	useEffect(() => {
		if (isError) {
			console.log("error");
			toast.error(message);
		}
		if (user) {
			navigate("/");
		}
	}, [user, isError, isSuccess, message, isLoading]);

	return (
		<>
			<section className="text-center mt-5">
				<h1>
					<FaUser className="fs-2" />
					Log In
				</h1>
				<p>Log in to view your progress</p>
			</section>
			<section>
				<form className="row" onSubmit={login}>
					<div className="col-sm-4 mx-auto">
						<div className="card text-center">
							<div className="card-body d-flex flex-column mx-auto">
								<div className="mb-4">
									<label htmlFor="name" className="form-label">
										Email
									</label>
									<input
										type="text"
										className="form-control text-center"
										name="email"
										id="email"
										value={email}
										placeholder="enter your Email"
										onChange={infoChange}
									/>
								</div>
								<div className="mb-4">
									<label htmlFor="password" className="form-label">
										Password
									</label>
									<input
										type="text"
										className="form-control text-center"
										name="password"
										id="password"
										value={password}
										placeholder="enter your password"
										onChange={infoChange}
									/>
								</div>
								<div className="text-center">
									<button type="submit" className="btn btn-success">
										Login
									</button>
								</div>
							</div>
						</div>
					</div>
				</form>
			</section>
		</>
	);
}

export default Login;
