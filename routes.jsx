import React from 'react';
import Router from 'react-router';
import Main from 'components/main.jsx!';
import Index from 'components/index.jsx!';
import FencerList from 'components/Fencers/index.jsx!';
import Events from 'components/Events/main.jsx!';
import EventsFencers from 'components/Events/fencers.jsx!';
import EventsBracket from 'components/Events/bracket.jsx!';
let { Route, DefaultRoute } = Router;

export default (
	<Route name="app" path="/" handler={Main}>
		<Route name="fencers" handler={FencerList} />
		<Route name="events" handler={Events}>
			<DefaultRoute name="events-fencers" handler={EventsFencers} />
			<Route name="events-bracket" handler={EventsBracket} />
		</Route>
		<DefaultRoute handler={Index} />
	</Route>
);
