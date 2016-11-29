import React from 'react';
import Router from 'react-router';
import Main from 'components/main';
import Index from 'components/index';
import FencerList from 'components/Fencers/index';
import Events from 'components/Events/main';
import EventsFencers from 'components/Events/fencers';
import EventsBracket from 'components/Events/bracket';
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
