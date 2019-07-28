import React from 'react';

const MatchedPerson = (props) => {
	const { person, showPopup } = props;

	return (
		<div id="matched-person-component">

			<div className="wrapper" onClick={showPopup} id={person.id}>
				<p className="title" id={person.id}>{person.name}</p>
				<div className="image">
					<img alt={person.name} src={person.img} id={person.id} />
				</div>
			</div>

		</div>
	);
};
export default MatchedPerson;
