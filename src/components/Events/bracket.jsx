import React from 'react';
import { connect } from 'react-redux';
import is from 'check-types';
import Event from 'model/Event';

function Bracket({ event }) {
  if (is.not.assigned(event) || !event.isRunning) return null;
  const bouts = event.currentRound.bouts;
  return (
    <section>
      <h1>First Round</h1>
      <ul>
        {
          bouts.map(b => (
            <li key={`bout-${b.id}`}>
              {`(${b.rightFencer.seed}) ${b.rightFencer.name} vs. (${b.leftFencer.seed}) ${b.leftFencer.name}`}
            </li>
          ))
        }
      </ul>
    </section>
  );
}

Bracket.propTypes = {
  event: React.PropTypes.instanceOf(Event),
};

export default connect(
  state => ({
    event: state.sampleEvent,
  }),
)(Bracket);
