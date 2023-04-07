import React from 'react';
import { GiWeightLiftingUp } from 'react-icons/gi';
import { Link } from 'react-router-dom';

function Navbar() {
	return (
		<nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
			<div className='container-fluid'>
				<Link className='navbar-brand' to='/'>
					<GiWeightLiftingUp className='fs-1' />
				</Link>
				<button
					className='navbar-toggler'
					type='button'
					data-bs-toggle='collapse'
					data-bs-target='#navbarNav'
					aria-controls='navbarNav'
					aria-expanded='false'
					aria-label='Toggle navigation'>
					<span className='navbar-toggler-icon'></span>
				</button>
				<div className='collapse navbar-collapse' id='navbarNav'>
					<ul className='navbar-nav me-auto mb-2 mb-lg-0'>
						<li className='nav-item text-light'>
							<Link className='nav-link' to='/exercises'>
								Exercises
							</Link>
						</li>
						<li className='nav-item text-light'>
							<Link className='nav-link' to='/logs'>
								Logs
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
