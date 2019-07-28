import React from 'react';

const Person = (props) => {
	const { person } = props;

	return (
		<div id="person-component">
			<h3>{person.name}</h3>
			<div id="popup-profile">
				<div id="popup-wrapper">
					<p>
Born:
						{' '}
						{person.birthday}
					</p>
					<p>
(
						{person.place_of_birth}
)
					</p>
					<div id="popup-image">
						<img alt={person.name} src={person.img} />
					</div>
					{(person.deathday)
						&& (
							<p>
Died:
								{' '}
								{person.deathday}
							</p>
						)}
				</div>
				<div id="popup-bio">
					<p>
						{person.biography}
					</p>
				</div>
			</div>
		</div>
	);
};
export default Person;
