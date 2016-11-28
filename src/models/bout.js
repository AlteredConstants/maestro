import Immutable from 'immutable';
import Model from 'models/model';
import Fencer from 'models/fencer';
import FencerStore from 'stores/fencer_store';

const internal = new WeakMap();

function getScoreSheet(fencer) {
  return Immutable.Map({fencer, score: 0});
}

let tempId = 0;
const defaults = {
  id: () => Date.now() + '-' + tempId++,
  isCompleted: false
};

const denormalizers = {
  'right.fencer': {
    model: Fencer,
    run: FencerStore.get
  },
  'left.fencer': {
    model: Fencer,
    run: FencerStore.get
  },
  right: {
    model: Immutable.Map,
    run: Immutable.Map
  },
  left: {
    model: Immutable.Map,
    run: Immutable.Map
  }
};

const translations = {
  right: rightFencer => getScoreSheet(rightFencer),
  left: leftFencer => getScoreSheet(leftFencer)
};

export default class Bout extends Model {
  constructor(params) {
    super(params, internal, {defaults, denormalizers, translations});
  }

  get rightFencer() {
    return internal.get(this).get('right').get('fencer');
  }

  get leftFencer() {
    return internal.get(this).get('left').get('fencer');
  }

  get rightScore() {
    return internal.get(this).get('right').get('score');
  }

  get leftScore() {
    return internal.get(this).get('left').get('score');
  }

  get isCompleted() {
    return internal.get(this).get('isCompleted');
  }

  complete() {
    return new Bout(internal.get(this).set('isCompleted', true));
  }

  serialize() {
    return super.serialize().withMutations(fields => {
      fields.delete('rightFencer');
      fields.delete('leftFencer');
    });
  }
}
