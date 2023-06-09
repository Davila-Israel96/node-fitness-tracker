import React, { useState, useEffect, useContext } from "react";
import UserContext from "../components/UserContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";

function Register() {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		passwordConfirm: "",
	});
	const { registerUser, ...state } = useContext(UserContext);
	const { user, isError, isSuccess, message, isLoading } = state;

	//destructure formData
	const { name, email, password, passwordConfirm } = formData;

	const infoChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const submitUser = async (e) => {
		e.preventDefault();

		if (password !== passwordConfirm) {
			console.log("Passwords do not match");
		} else {
			registerUser(formData);
		}
	};

	useEffect(() => {
		if (isError) {
			console.log("error");
			toast.error(message);
		}
		if (isSuccess || user) {
			navigate("/");
		}
	}, [user, isError, isSuccess, message, isLoading]);

	return (
		<>
			<section className="text-center mt-5">
				<h1>
					<FaUser className="fs-2" />
					Register
				</h1>
				<p>Please create an account</p>
			</section>
			<section>
				<form className="row" onSubmit={submitUser}>
					<div className="col-sm-4 mx-auto">
						<div className="card text-center">
							<div className="card-body d-flex flex-column mx-auto">
								<div className="mb-4">
									<label htmlFor="name" className="form-label">
										Username
									</label>
									<input
										type="text"
										className="form-control text-center"
										name="name"
										id="name"
										value={name}
										placeholder="enter your name"
										onChange={infoChange}
									/>
								</div>
								<div className="mb-4">
									<label htmlFor="email" className="form-label">
										Email
									</label>
									<input
										type="text"
										className="form-control text-center"
										name="email"
										id="email"
										value={email}
										placeholder="enter your email"
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
								<div className="mb-4">
									<label htmlFor="passwordConfirm" className="form-label">
										Confirm Password
									</label>
									<input
										type="text"
										className="form-control text-center"
										name="passwordConfirm"
										id="passwordConfirm"
										value={passwordConfirm}
										placeholder="confirm your password"
										onChange={infoChange}
									/>
								</div>
								<div className="text-center">
									<button type="submit" className="btn btn-success">
										Submit
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

export default Register;
