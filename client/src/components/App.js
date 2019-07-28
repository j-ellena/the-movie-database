import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Nav from './Nav';
import Home from './Home';
import Discover from './Discover';
import Movie from './Movie';
import Page404 from './Page404';

const App = () => (

	<div id="app-component">

		<BrowserRouter>
			<div id="router-div">

				<Nav />

				<Switch>
					<Route
						exact
						path="/"
						component={Home}
					/>
					<Route
						exact
						path="/discover"
						component={Discover}
					/>
					<Route
						exact
						path="/movie/:id"
						component={Movie}
					/>
					<Route component={Page404} />
				</Switch>

			</div>
		</BrowserRouter>

	</div>
);

export default App;
