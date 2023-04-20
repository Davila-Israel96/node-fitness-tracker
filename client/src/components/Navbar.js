import React, { useContext } from "react";
import { GiWeightLiftingUp } from "react-icons/gi";
import { FiLogOut, FiLogIn } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

function Navbar() {
	const navigate = useNavigate();
	const { logoutUser, ...state } = useContext(UserContext);
	const { user } = state;

	const logout = (e) => {
		e.preventDefault();

		logoutUser();
		navigate("/login");
	};

	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
			<div className="container-fluid">
				<Link className="navbar-brand" to="/">
					<GiWeightLiftingUp className="fs-1" />
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNav"
					aria-controls="navbarNav"
					aria-expanded="false"
					aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav d-flex flex-row me-auto mb-2 mb-lg-0">
						<li className="nav-item text-light">
							<Link className="nav-link" to="/exercises">
								Exercises
							</Link>
						</li>
						<li className="nav-item text-light">
							<Link className="nav-link" to="/logs">
								Logs
							</Link>
						</li>
						<li className="nav-item text-light">
							<Link className="nav-link" to="/exercises">
								Exercises
							</Link>
						</li>
					</ul>
					<ul className="navbar-nav d-flex flex-row-reverse mb-2 mb-lg-0">
						{user ? (
							<li>
								<button
									type="button"
									className="btn text-light"
									onClick={logout}>
									<FiLogOut className="fs-4 me-2" />
								</button>
							</li>
						) : (
							<>
								<li>
									<Link className="nav-link" to="/register">
										Register
									</Link>
								</li>
								<li>
									<Link className="nav-link" to="/login">
										<FiLogIn className="fs-4 me-2" />
										Log In
									</Link>
								</li>
							</>
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
