import React from 'react';
import Person from './Person';

const RenderPopup = (props) => {
	const { person, hidePopup } = props;
	const handlePropagation = e => e.stopPropagation();

	return (
		<div
			id="popup-component"
			onClick={hidePopup}
		>

			<div
				id="popup-div"
				onClick={handlePropagation}
			>

				<div
					id="popup-x"
					onClick={hidePopup}
				>
				x
				</div>
				<Person person={person} />
				<button onClick={hidePopup}>Close</button>
			</div>
		</div>
	);
};
export default RenderPopup;
