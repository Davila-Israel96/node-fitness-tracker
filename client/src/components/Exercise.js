import React, { useContext, useState } from 'react';
import { ExerciseContext } from './ExerciseContext';
import { UserContext } from './UserContext';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { MdCheckCircle } from 'react-icons/md';
import { MdCancel } from 'react-icons/md';
import { AiFillEdit } from 'react-icons/ai';
/**
 * @desc component for exercise to be shown in list,
 * can be edited or deleted by logged in user
 * */
function Exercise({ props }) {
	const [editView, setEditView] = useState(false);
	const [exercise, setExercise] = useState({
		name: props.name,
		muscleGroup: props.muscleGroup,
		updatedName: props.name,
		updatedMuscleGroup: props.muscleGroup,
	});

	const { deleteExercise, updateExercise } = useContext(ExerciseContext);
	const { ...state } = useContext(UserContext);
	const { user } = state;
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(exercise);
		updateExercise(exercise, user.token);
		setEditView(false);
	};

	const convertDate = (date) => {
		const newDate = new Date(date);
		return newDate.toLocaleDateString();
	};
	return (
		<>
			{editView ? (
				<form className='row my-2' onSubmit={handleSubmit}>
					<input
						className='col-4 text-start my-auto'
						type='text'
						placeholder={props.name}
						onChange={(e) =>
							setExercise({ ...exercise, updatedName: e.target.value })
						}
					/>
					<div className='col-1'></div>
					<select
						className='col-4 my-autobtn btn-sm btn-outline-secondary dropdown-toggle'
						onChange={(e) =>
							setExercise({ ...exercise, updatedMuscleGroup: e.target.value })
						}>
						<option value={'Arms'} className='dropdown-item'>
							Arms
						</option>
						<option value={'Chest'} className='dropdown-item'>
							Chest
						</option>
						<option value={'Legs'} className='dropdown-item'>
							Legs
						</option>
						<option value={'Back'} className='dropdown-item'>
							Back
						</option>
						<option value={'Shoulders'} className='dropdown-item'>
							Shoulders
						</option>
						<option value={'Core'} className='dropdown-item'>
							Core
						</option>
					</select>
					<div className='col-1'></div>
					{/* <input
						className="col-5 text-center my-auto"
						type="text"
						placeholder={props.muscleGroup}
						onChange={(e) =>
							setExercise({ ...exercise, muscleGroup: e.target.value })
						}
					/> */}
					<button
						type='button'
						className='btn btn-sm text-danger fs-5 col-1 my-auto'
						onClick={() => setEditView(false)}>
						<MdCancel />
					</button>
					<button
						type='submit'
						className='btn btn-sm text-success fs-5 col-1 my-auto'>
						<MdCheckCircle />
					</button>
				</form>
			) : (
				<div className='row my-2'>
					<p className='col-4 text-start my-auto'>
						{convertDate(props.createdAt)}
					</p>
					<p className='col-6 my-auto text-start'>{props.name}</p>
					<button
						type='button'
						className='btn btn-primary btn-sm col-1 my-auto mx-auto'
						onClick={() => setEditView(true)}>
						<AiFillEdit />
					</button>
					<button
						type='button'
						className='btn btn-danger btn-sm col-1 my-auto mx-auto'
						onClick={() => deleteExercise(exercise, user.token)}>
						<RiDeleteBin2Fill />
					</button>
					<div className='col-1'></div>
				</div>
			)}
		</>
	);
}

export default Exercise;
