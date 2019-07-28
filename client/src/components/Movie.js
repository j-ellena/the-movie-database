import React, { Component } from 'react';
import axios from 'axios';

class Movie extends Component {
	constructor(props) {
		super(props);
		this.state = {
			movie: {},
		};
	}

	async componentDidMount() {
		const { match } = this.props;
		const { id } = match.params;
		const response = await axios.get(`/search/movie/${id}`);
		this.setState({
			movie: response.data,
		});
	}

	render() {
		const { movie } = this.state;

		return (
			<div id="movie-component">
				<h3>{movie.original_title}</h3>
				<div id="popup-profile">
					<div id="popup-wrapper">
						<p>
Release date:
							{' '}
							{movie.release_date}
						</p>
						<p>
Runtime:
							{' '}
							{movie.runtime}
							{' '}
min
						</p>
						<div id="popup-image">
							<img alt={movie.original_title} src={movie.img} />
						</div>
						<p>
Revenue: $
							{' '}
							{movie.revenue}
						</p>
					</div>
					<div id="popup-bio">
						<p>
							{movie.overview}
						</p>
					</div>
				</div>

			</div>
		);
	}
}


export default Movie;
