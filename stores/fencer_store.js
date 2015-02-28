import Reflux from 'reflux';
import Fencer from 'models/fencer';
import FencerActions from 'actions/fencer_actions';

var FencerStore = Reflux.createStore({
	listenables: FencerActions,

	getAll() {
		if (localStorage.fencers) {
			let fencers = JSON.parse(localStorage.fencers);
			if (!Array.isArray(fencers))
				return [];
			return fencers.map(f => new Fencer(f));
		} else {
			return [];
		}
	},

	get(id) {
		if (!id)
			return this.getAll();
		return this.getAll().find(f => f.getId() === id);
	},

	add(fencer) {
		let fencers = this.getAll();
		fencers.push(fencer);
		localStorage.fencers = JSON.stringify(fencers);
		this.trigger(fencers);
	},

	remove(id) {
		let fencers = this.getAll().filter(f => f.getId() !== id);
		localStorage.fencers = JSON.stringify(fencers);
		this.trigger(fencers);
	}
});

export default FencerStore;
