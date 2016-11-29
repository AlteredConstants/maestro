import Immutable from 'immutable';
import is from 'check-types';

function getKey(model, isCollection) {
  let key = is.function(model) ? model.name : model.constructor.name;
  key = key.toLowerCase();
  return (isCollection === true) ? `${key}s` : key;
}

export default class LocalStorage {
  static getMany(Model) {
    const key = getKey(Model, true);
    if (is.not.assigned(localStorage[key])) return Immutable.Map();
    const models = JSON.parse(localStorage[key]);
    if (is.not.array(models)) return Immutable.Map();
    return Immutable.Map(models
      .map(m => new Model(m))
      .reduce((obj, m) => ({ ...obj, [m.id]: m }), {}),
    );
  }

  static setMany(modelConstructor, models) {
    const key = getKey(modelConstructor, true);
    localStorage[key] = JSON.stringify(models.map(m => m.serialize()).toList());
  }

  static getOne(Model) {
    const key = getKey(Model, false);
    if (is.not.assigned(localStorage[key])) return null;
    const model = JSON.parse(localStorage[key]);
    if (is.not.object(model)) {
      return null;
    }
    return new Model(model);
  }

  static setOne(modelConstructor, model) {
    const key = getKey(modelConstructor, false);
    localStorage[key] = JSON.stringify(model.serialize());
  }
}
