import React from 'react';
import { Match } from 'react-router';
import MainNavigation from './main-navigation';
import Index from './index';
import FencerList from './Fencers/index';
import Events from './Events/main';

export default function Main() {
  return (
    <section>
      <h1>Maestro</h1>
      <MainNavigation />
      <Match exactly pattern="/" component={Index} />
      <Match pattern="/fencers" component={FencerList} />
      <Match pattern="/events" component={Events} />
    </section>
  );
}
