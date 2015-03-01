import Reflux from 'reflux';
import Fencer from 'models/fencer';
import FencerActions from 'actions/fencer_actions';
import Immutable from 'immutable';
import is from 'check-types';

export default Reflux.createStore({
	listenables: FencerActions,

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
		return this.getAll().find(f => f.getId() === id);
	},

	add(fencer) {
		let fencers = this.getAll().push(fencer);
		localStorage.fencers = JSON.stringify(fencers);
		this.trigger(fencers);
	},

	remove(fencer) {
		let id = Fencer.getId(fencer);
		let fencers = this.getAll().filter(f => f.getId() !== id);
		localStorage.fencers = JSON.stringify(fencers);
		this.trigger(fencers);
	}
});
