import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const CollapseCard = ({ open, title, children }) => {
	const [isOpen, setIsOpen] = useState(open);

	const handleCardOpen = () => {
		setIsOpen(!isOpen);
	};

	return (
		<>
			<div>
				<div className="p-3 border-bottom d-flex justify-content-between">
					<h6 className="font-weight-bold">{title}</h6>
					<button type="button" className="btn" onClick={handleCardOpen}>
						{isOpen ? <FaChevronUp /> : <FaChevronDown />}
					</button>

					<div className="border-bottom">
						<div>{isOpen && <div className="p-3">{children}</div>}</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default CollapseCard;
