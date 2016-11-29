import React from 'react';
import is from 'check-types';
import Event from 'models/event';

export default function Bracket({ event }) {
  if (is.not.assigned(event) || !event.isRunning) return null;
  return (
    <section>
      <h1>First Round</h1>
      <ul>
        {
          event.currentRound.bouts.map(b => (
            <li key={`bout-${b.id}`}>
              {b.rightFencer.name}
              {' vs. '}
              {b.leftFencer.name}
            </li>
          ))
          // React still doesn't like Immutable's Maps.
          .toArray()
        }
      </ul>
    </section>
  );
}

Bracket.propTypes = {
  event: React.PropTypes.instanceOf(Event),
};
