import Reflux from 'reflux';
import Fencer from 'models/fencer';
import FencerActions from 'actions/fencer_actions';
import Immutable from 'immutable';
import is from 'check-types';

function onAddFencer(fencer) {
	let fencers = this.getAll().push(fencer);
	localStorage.fencers = JSON.stringify(fencers);
	this.trigger(fencers);
}

function onRemoveFencer(fencer) {
	let id = Fencer.getId(fencer);
	let fencers = this.getAll().filter(f => f.id !== id);
	localStorage.fencers = JSON.stringify(fencers);
	this.trigger(fencers);
}

export default Reflux.createStore({
	init: function() {
		this.listenTo(FencerActions.add, onAddFencer);
		this.listenTo(FencerActions.remove, onRemoveFencer);
	},

	getAll() {
		if (is.not.assigned(localStorage.fencers))
			return Immutable.List();
		let fencers = JSON.parse(localStorage.fencers);
		if (is.not.array(fencers))
			return Immutable.List();
		return Immutable.List(fencers.map(f => new Fencer(f)));
	},

	get(id) {
		if (is.not.assigned(id))
			return this.getAll();
		return this.getAll().find(f => f.id === id);
	}
});
