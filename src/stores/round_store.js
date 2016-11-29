import Reflux from 'reflux';
import Round from 'models/round';
import { ByeFencer } from 'models/fencer';
import RoundActions from 'actions/round_actions';
import BoutActions from 'actions/bout_actions';
import EventActions from 'actions/event_actions';
import LocalStorage from 'interfaces/local_storage';

function getAllLocal() {
  return LocalStorage.getMany(Round);
}

function setAllLocal(rounds) {
  LocalStorage.setMany(Round, rounds);
}

function updateLocal(round) {
  const newRounds = getAllLocal().set(round.id, round);
  setAllLocal(newRounds);
  return newRounds;
}

function onStart(competitors) {
  const round = Round.create(competitors, ByeFencer);
  round.bouts.forEach(b => BoutActions.add(b));
  this.trigger(updateLocal(round));
  EventActions.nextRoundStarted(round);
}

// function onAwardTouch() {
// }

// function onCompleteBout(bout) {
// }

export default Reflux.createStore({
  init() {
    this.listenTo(RoundActions.start, onStart);
    // this.listenTo(BoutActions.awardTouch, onAwardTouch);
    // this.listenTo(BoutActions.complete, onCompleteBout);
  },

  getAll() {
    return getAllLocal();
  },

  get(id) {
    return getAllLocal().get(id);
  },
});
