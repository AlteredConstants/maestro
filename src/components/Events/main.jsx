import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';
import FencerStateMixin from '../mixins/fencer_state';
import EventActions from 'actions/event_actions';
import EventStore from 'stores/event_store';
import is from 'check-types';
const RouteHandler = Router.RouteHandler;

export default React.createClass({
  mixins: [FencerStateMixin, Reflux.connect(EventStore, "event")],

  getInitialState() {
    return { event: null };
  },

  componentDidMount() {
    this.setState({ event: EventStore.get() });
  },

  toggleEventStatus() {
    if (this.state.event.isRunning)
      EventActions.stop();
    else
      EventActions.start();
  },

  render() {
    const event = this.state.event;
    const fencers = this.state.fencers;
    let buttonText = 'Loading...';
    if (is.assigned(event))
      buttonText = event.isRunning ? 'Stop' : 'Start';
    return (
      <section>
        <h1>
          {'Events '}
          <button
            onClick={this.toggleEventStatus}
            disabled={is.not.assigned(event)}>
            {buttonText}
          </button>
        </h1>
        <RouteHandler event={event} fencers={fencers} />
      </section>
    );
  }
});
