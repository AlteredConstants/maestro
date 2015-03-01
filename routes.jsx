import React from 'react';
import Router from 'react-router';
import Main from 'components/main.jsx!';
import Index from 'components/index.jsx!';
import FencerList from 'components/fencer_list.jsx!';
import Events from 'components/Events/index.jsx!';
let { Route, DefaultRoute } = Router;

export default (
	<Route name="app" path="/" handler={Main}>
		<Route name="fencers" handler={FencerList} />
		<Route name="events" handler={Events} />
		<DefaultRoute handler={Index} />
	</Route>
);
