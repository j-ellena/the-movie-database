import React from 'react';
import logoTMDB from '../assets/logo-tmdb.svg';

const Home = () => (

	<div id="home-component">

		<h4>My React + Express wrapper for</h4>

		<div id="logo-home">
			<img alt="logo The Movie Database" src={logoTMDB} />
		</div>

	</div>
);

export default Home;
