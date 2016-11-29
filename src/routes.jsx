import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Main from 'components/main';
import Index from 'components/index';
import FencerList from 'components/Fencers/index';
import Events from 'components/Events/main';
import EventsFencers from 'components/Events/fencers';
import EventsBracket from 'components/Events/bracket';

export default (
  <Route path="/" component={Main}>
    <Route path="fencers" component={FencerList} />
    <Route path="events" component={Events}>
      <IndexRoute component={EventsFencers} />
      <Route path="bracket" component={EventsBracket} />
    </Route>
    <IndexRoute component={Index} />
  </Route>
);
