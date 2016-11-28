import Model from 'models/model';

const internal = new WeakMap();

const defaults = {
  id: () => Date.now().toString()
};

export default class Fencer extends Model {
  constructor(params) {
    super(params, internal, {defaults});
  }

  get name() {
    return internal.get(this).get('name');
  }
}

export const ByeFencer = new Fencer({id: 'bye', name: 'Sunny'});
