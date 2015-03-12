import Immutable from 'immutable';
import Fencer from 'models/fencer';
import is from 'check-types';

const internal = new WeakMap();

function parse(params) {
	return Immutable.Map(params).withMutations(function(map) {
		if (is.not.assigned(map.get('id')))
			map.set('id', Date.now());
		map.set('fencerIds', Immutable.List(map.get('fencerIds')));
		if (is.not.assigned(map.get('isRunning')))
			map.set('isRunning', false);
	});
}

export default class Event {
	constructor(params) {
		internal.set(this, parse(params));
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
		let newState = internal.get(this).updateIn(['fencerIds'],
				list => list.push(fencerId));
		return new Event(newState);
	}

	removeFencer(fencer) {
		let fencerId = Fencer.getId(fencer);
		let newState = internal.get(this).updateIn(['fencerIds'],
				list => list.filter(i => i !== fencerId));
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
