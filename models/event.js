import Immutable from 'immutable';
import Model from 'models/model';
import Fencer from 'models/fencer';

const internal = new WeakMap();

const defaults = {
	id: () => Date.now(),
	isRunning: false
};

const translations = {
	fencerIds: fencerIds => Immutable.List(fencerIds)
};

export default class Event extends Model {
	constructor(params) {
		super(params, internal, {defaults, translations});
	}

	getId() {
		return internal.get(this).get('id');
	}

	getFencerIds() {
		return internal.get(this).get('fencerIds');
	}

	isRunning() {
		return internal.get(this).get('isRunning');
	}

	addFencer(fencer) {
		let fencerId = Fencer.getId(fencer);
		let newState = internal.get(this)
			.updateIn(['fencerIds'], list => list.push(fencerId));
		return new Event(newState);
	}

	removeFencer(fencer) {
		let fencerId = Fencer.getId(fencer);
		let newState = internal.get(this)
			.updateIn(['fencerIds'], list => list.filter(i => i !== fencerId));
		return new Event(newState);
	}

	start() {
		return new Event(internal.get(this).set('isRunning', true));
	}

	stop() {
		return new Event(internal.get(this).set('isRunning', false));
	}

	toJSON() {
		return internal.get(this).toJSON();
	}
}
