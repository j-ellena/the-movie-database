import React from 'react';
import { Link } from 'react-router-dom';
import logoTMDB from '../assets/logo-tmdb.svg';

const Nav = () => (
	<div id="nav-component">

		<Link to="/">
			<button type="button">
				<img id="logo-nav" src={logoTMDB} alt="logo-tmdb" />
			</button>
		</Link>

		<Link to="/discover">
			<button type="button">
					Discover Match
			</button>
		</Link>

	</div>
);

export default Nav;
