import React from 'react';
import Reflux from 'reflux';
import EventActions from 'actions/event_actions';
import EventStore from 'stores/event_store';
import is from 'check-types';
import FencerStateMixin from '../mixins/fencer_state';

export default React.createClass({
  propTypes: {
    children: React.PropTypes.element,
  },

  mixins: [FencerStateMixin, Reflux.connect(EventStore, 'event')],

  getInitialState() {
    return { event: null };
  },

  componentDidMount() {
    this.setState({ event: EventStore.get() });
  },

  toggleEventStatus() {
    if (this.state.event.isRunning) EventActions.stop();
    else EventActions.start();
  },

  render() {
    const event = this.state.event;
    const fencers = this.state.fencers && this.state.fencers.toArray();
    let buttonText = 'Loading...';
    if (is.assigned(event)) buttonText = event.isRunning ? 'Stop' : 'Start';
    return (
      <section>
        <h1>
          {'Events '}
          <button
            onClick={this.toggleEventStatus}
            disabled={is.not.assigned(event)}
          >
            {buttonText}
          </button>
        </h1>
        {React.cloneElement(this.props.children, { event, fencers })}
      </section>
    );
  },
});
