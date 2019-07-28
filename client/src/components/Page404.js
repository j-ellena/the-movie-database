import React from 'react';
import funkyChicken from '../assets/funky-chicken.gif';

const Page404 = ({ location }) => (
	<div id="page404-component">

		<h3>No match found for</h3>

		<h3><code>{location.pathname}</code></h3>

		<div id="funky-chicken">
			<img alt="funky-chicken" src={funkyChicken} />
		</div>

		<h4>Try typing that again, you funky chicken!</h4>

	</div>
);

export default Page404;
