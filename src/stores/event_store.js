import Reflux from 'reflux';
import Event from 'models/event';
import FencerActions from 'actions/fencer_actions';
import EventActions from 'actions/event_actions';
import RoundActions from 'actions/round_actions';
import LocalStorage from 'interfaces/local_storage';
import is from 'check-types';

function getLocal() {
  let event = LocalStorage.getOne(Event);
  return is.assigned(event) ? event : new Event();
}

function setLocal(event) {
  LocalStorage.setOne(Event, event);
  return event;
}

function updateLocal(update) {
  return setLocal(update(getLocal()));
}

function onAddFencer(fencer) {
  let updatedEvent = updateLocal(e => e.addFencer(fencer));
  this.trigger(updatedEvent);
}

function onRemoveFencer(fencer) {
  let updatedEvent = updateLocal(e => e.removeFencer(fencer));
  this.trigger(updatedEvent);
}

function onStart() {
  let updatedEvent = updateLocal(function(event) {
    if (event.fencers.size < 2) {
      throw new Error('Not enough fencers in the event.');
    }
    let seededCompetitors = event.fencers.toList();
    RoundActions.start(seededCompetitors);
    return event.start();
  });
  this.trigger(updatedEvent);
}

function onStop() {
  let updatedEvent = updateLocal(event => event.stop());
  this.trigger(updatedEvent);
}

function onNextRoundStarted(round) {
  let updatedEvent = updateLocal(event => event.setCurrentRound(round));
  this.trigger(updatedEvent);
}

export default Reflux.createStore({
  init: function() {
    this.listenTo(EventActions.addFencer, onAddFencer);
    this.listenTo(EventActions.removeFencer, onRemoveFencer);
    this.listenTo(EventActions.start, onStart);
    this.listenTo(EventActions.stop, onStop);
    this.listenTo(EventActions.nextRoundStarted, onNextRoundStarted);
    this.listenTo(FencerActions.remove, onRemoveFencer);
  },

  get() {
    return getLocal();
  }
});
