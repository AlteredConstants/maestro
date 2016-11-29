import Reflux from 'reflux';
import Fencer, { ByeFencer } from 'models/fencer';
import FencerActions from 'actions/fencer_actions';
import LocalStorage from 'interfaces/local_storage';

function getAllLocal() {
  return LocalStorage.getMany(Fencer);
}

function setAllLocal(fencers) {
  LocalStorage.setMany(Fencer, fencers);
  return fencers;
}

function updateLocal(update) {
  return setAllLocal(update(getAllLocal()));
}

function onAddFencer(fencer) {
  const updatedFencers = updateLocal(fencers => fencers.set(fencer.id, fencer));
  this.trigger(updatedFencers);
}

function onRemoveFencer(fencer) {
  const updatedFencers = updateLocal(fencers => fencers.delete(fencer.id));
  this.trigger(updatedFencers);
}

export default Reflux.createStore({
  init() {
    this.listenTo(FencerActions.add, onAddFencer);
    this.listenTo(FencerActions.remove, onRemoveFencer);
  },

  getAll() {
    return getAllLocal();
  },

  get(id) {
    if (id === ByeFencer.id) {
      return ByeFencer;
    }
    return getAllLocal().get(id);
  },
});
