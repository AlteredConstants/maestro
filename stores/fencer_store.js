import Reflux from 'reflux';
import Fencer, {ByeFencer} from 'models/fencer';
import FencerActions from 'actions/fencer_actions';
import Immutable from 'immutable';
import LocalStorage from 'interfaces/local_storage';
import is from 'check-types';

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
	let fencers = updateLocal(fencers => fencers.set(fencer.id, fencer));
	this.trigger(fencers);
}

function onRemoveFencer(fencer) {
	let fencers = updateLocal(fencers => fencers.delete(fencer.id));
	this.trigger(fencers);
}

export default Reflux.createStore({
	init: function() {
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
	}
});
