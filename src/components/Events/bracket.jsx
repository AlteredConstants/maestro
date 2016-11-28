import React from 'react';
import Fencer from 'models/fencer';
import {createRound} from 'models/round';
import Immutable from 'immutable';
import is from 'check-types';

export default React.createClass({
  render() {
    const event = this.props.event;

    if (is.not.assigned(event) || !event.isRunning)
      return null;

    return (
      <section>
        <h1>First Round</h1>
        <ul>
          {
            event.currentRound.bouts.map(b =>
              <li key={'bout-' + b.id}>
                {b.rightFencer.name}
                {' vs. '}
                {b.leftFencer.name}
              </li>
            )
            // TODO: Remove once we can update to React 0.13.
            .toArray()
          }
        </ul>
      </section>
    );
  }
});
