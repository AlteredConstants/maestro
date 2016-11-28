import Immutable from 'immutable';
import is from 'check-types';

function getKey(model, isCollection) {
  let key = is.function(model) ? model.name : model.constructor.name;
  key = key.toLowerCase();
  return (isCollection === true) ? key + 's' : key;
}

export default class LocalStorage {
  static getMany(modelConstructor) {
    let key = getKey(modelConstructor, true);
    if (is.not.assigned(localStorage[key]))
      return Immutable.Map();
    let models = JSON.parse(localStorage[key]);
    if (is.not.array(models))
      return Immutable.Map();
    return Immutable.Map(models
      .map(m => new modelConstructor(m))
      .reduce((obj, m) => {obj[m.id] = m; return obj}, {})
    );
  }

  static setMany(modelConstructor, models) {
    let key = getKey(modelConstructor, true);
    localStorage[key] = JSON.stringify(models.map(m => m.serialize()).toList());
  }

  static getOne(modelConstructor) {
    let key = getKey(modelConstructor, false);
    if (is.not.assigned(localStorage[key]))
      return null;
    let model = JSON.parse(localStorage[key]);
    if (is.not.object(model)) {
      return null;
    }
    return new modelConstructor(model);
  }

  static setOne(modelConstructor, model) {
    let key = getKey(modelConstructor, false);
    localStorage[key] = JSON.stringify(model.serialize());
  }
}
