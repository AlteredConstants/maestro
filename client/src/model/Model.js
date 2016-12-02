import { set, get, concat, remove } from 'lodash/fp';

export default class Model {
  addTo(path, item) {
    return set(path, concat(get(path, this), item), this);
  }

  removeFrom(path, item) {
    return set(path, remove(i => i.id === item.id, get(path, this)), this);
  }
}
