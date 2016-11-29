import React from 'react';
import { Link } from 'react-router';

export default React.createClass({
  render() {
    return (
      <section>
        <ul>
          <li><Link to="/fencers">Fencers</Link></li>
          <li><Link to="/events">Events</Link></li>
          <li><Link to="/events/bracket">Bracket</Link></li>
        </ul>
      </section>
    );
  }
});
