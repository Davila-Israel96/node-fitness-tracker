import React from "react";

function AddExercise() {
	return (
		<div class="modal" tabindex="-1">
			<div class="modal-dialog modal-dialog-centered">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title">Add an Exercise</h5>
						<button
							type="button"
							class="btn-close"
							data-bs-dismiss="modal"
							aria-label="Close"></button>
					</div>
					<div class="modal-body">
						<form>
							<div class="mb-3">
								<label for="exercise-name" class="col-form-label">
									Exercise Name:
								</label>
								<input
									type="text"
									class="form-control"
									id="exercise-name"></input>
							</div>
							<div class="mb-3">
								<div class="dropdown">
									<button
										class="btn btn-secondary dropdown-toggle"
										type="button"
										id="dropdownMenuButton1"
										data-bs-toggle="dropdown"
										aria-expanded="false">
										Dropdown button
									</button>
									<ul
										class="dropdown-menu"
										aria-labelledby="dropdownMenuButton1">
										<li></li>
										<li></li>
										<li></li>
									</ul>
								</div>
							</div>
						</form>
					</div>
					<div class="modal-footer">
						<button
							type="button"
							class="btn btn-secondary"
							data-bs-dismiss="modal">
							Close
						</button>
						<button type="button" class="btn btn-primary">
							Save changes
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AddExercise;
