import Immutable from 'immutable';
import is from 'check-types';

const internal = new WeakMap();

function parse(params) {
	return Immutable.Map(params).withMutations(function(map) {
		if (is.not.assigned(map.get('id')))
			map.set('id', Date.now());
	});
}

class Fencer {
	constructor(params) {
		internal.set(this, parse(params));
	}

	getId() {
		return internal.get(this).get('id');
	}

	getName() {
		return internal.get(this).get('name');
	}

	toJSON() {
		return internal.get(this).toJSON();
	}

	static getId(fencer) {
		if (is.instance(fencer, Fencer)) {
			return fencer.getId();
		} else if (is.integer(fencer)) {
			return fencer;
		} else {
			throw Error('Not a valid Fencer or Fencer ID.');
		}
	}
}

export default Fencer;
