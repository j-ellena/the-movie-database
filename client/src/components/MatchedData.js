import React from 'react';
import MatchedPerson from './MatchedPerson';
import MatchedMovies from './MatchedMovies';

const MatchedData = (props) => {
	const {
		person1, person2, data, showPopup, redirectUrl,
	} = props;

	const message = (data.length === 0)
		? 'haven\'t worked together.'
		: `have worked in ${data.length} movies together:`;

	return (
		<div id="matched-data-component">
			<div className="flex-row">
				<MatchedPerson
					person={person1}
					showPopup={showPopup}
				/>
				<h3>and</h3>
				<MatchedPerson
					person={person2}
					showPopup={showPopup}
				/>
			</div>
			<h3>{message}</h3>
			{(data.length > 0)
				&& <MatchedMovies data={data} redirectUrl={redirectUrl} />
			}
		</div>
	);
};
export default MatchedData;
