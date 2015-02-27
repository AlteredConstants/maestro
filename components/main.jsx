import React from 'react';
import Router from 'react-router';
import MainNavigation from './main-navigation.jsx!';
let RouteHandler = Router.RouteHandler;

export default React.createClass({
	render() {
		return (
			<section>
				<h1>Maestro</h1>
				<MainNavigation />
				<RouteHandler />
			</section>
		);
	}
});
