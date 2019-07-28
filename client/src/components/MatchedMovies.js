import React from 'react';

const MatchedMovies = (props) => {
	const { data, redirectUrl } = props;

	const list = data.map(movie => (
		<li className="wrapper" onClick={redirectUrl} key={movie.id} id={movie.id}>
			<p className="title" id={movie.id}>{movie.title}</p>
			<div className="image">
				<img alt={movie.title} src={movie.img} id={movie.id} />
			</div>
		</li>
	));

	return (
		<div id="match-movies-component">
			<ul id="gallery">{list}</ul>
		</div>
	);
};
export default MatchedMovies;
