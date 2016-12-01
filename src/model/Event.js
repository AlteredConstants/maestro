import { set, compose } from 'lodash/fp';
import Model from 'model/Model';
import Round from 'model/Round';

export default class Event extends Model {
  constructor({ id, fencers = [], isRunning = false, currentRound = null }) {
    super();
    this.id = id;
    this.fencers = fencers;
    this.isRunning = isRunning;
    this.currentRound = currentRound;
  }

  addFencer(fencer) {
    return this.addTo('fencers', fencer);
  }

  removeFencer(fencer) {
    return this.removeFrom('fencers', fencer);
  }

  start() {
    return compose(
      set('isRunning', true),
      set('currentRound', new Round({ seededCompetitors: this.fencers })),
    )(this);
  }

  stop() {
    return set('isRunning', false, this);
  }
}
