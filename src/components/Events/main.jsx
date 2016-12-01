import React from 'react';
import { connect } from 'react-redux';
import { Match } from 'react-router';
import { createStartEventAction, createStopEventAction } from 'action';
import Event from 'model/Event';
import Fencers from 'components/Events/fencers';
import Bracket from 'components/Events/bracket';

function Events({ pathname, event, startEvent, stopEvent }) {
  return (
    <section>
      <h1>
        {'Events '}
        {
          event && !event.isRunning
            && <button onClick={() => startEvent(event)}>Start</button>
        }
        {
          event && event.isRunning
            && <button onClick={() => stopEvent(event)}>Stop</button>
        }
      </h1>
      <Match exactly pattern={`${pathname}`} component={Fencers} />
      <Match pattern={`${pathname}/bracket`} component={Bracket} />
    </section>
  );
}

Events.propTypes = {
  pathname: React.PropTypes.string.isRequired,
  event: React.PropTypes.instanceOf(Event),
  startEvent: React.PropTypes.func.isRequired,
  stopEvent: React.PropTypes.func.isRequired,
};

export default connect(
  state => ({
    event: state.sampleEvent,
  }),
  dispatcher => ({
    startEvent: event => dispatcher(createStartEventAction(event)),
    stopEvent: event => dispatcher(createStopEventAction(event)),
  }),
)(Events);
