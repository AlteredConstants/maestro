import Immutable from 'immutable';
import Model from 'models/model';
import Fencer from 'models/fencer';
import Round from 'models/round';
import FencerStore from 'stores/fencer_store';
import RoundStore from 'stores/round_store';

const internal = new WeakMap();

const defaults = {
  id: () => Date.now().toString(),
  fencers: Immutable.Map(),
  isRunning: false,
};

const denormalizers = {
  fencers: {
    model: Fencer,
    run: FencerStore.get,
  },
  currentRound: {
    model: Round,
    run: RoundStore.get,
  },
};

const translations = {
  fencers: fencers => Immutable.Map(fencers),
};

export default class Event extends Model {
  constructor(params) {
    super(params, internal, { defaults, denormalizers, translations });
  }

  get fencers() {
    return internal.get(this).get('fencers');
  }

  get isRunning() {
    return internal.get(this).get('isRunning');
  }

  get currentRound() {
    return internal.get(this).get('currentRound');
  }

  addFencer(fencer) {
    const newState = internal.get(this)
      .updateIn(['fencers'], list => list.set(fencer.id, fencer));
    return new Event(newState);
  }

  removeFencer(fencer) {
    const newState = internal.get(this)
      .updateIn(['fencers'], list => list.delete(fencer.id));
    return new Event(newState);
  }

  start() {
    return new Event(internal.get(this).set('isRunning', true));
  }

  stop() {
    return new Event(internal.get(this).set('isRunning', false));
  }

  setCurrentRound(round) {
    return new Event(internal.get(this).set('currentRound', round));
  }
}
