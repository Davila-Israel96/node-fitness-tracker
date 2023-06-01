const convertDate = (date) => {
	const newDate = new Date(date);
	return newDate.toLocaleDateString();
};

export default convertDate;
