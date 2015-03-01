import is from 'check-types';

const internal = new WeakMap();

class Fencer {
	constructor(params) {
		if (is.not.assigned(params.id))
			params.id = Date.now();
		internal.set(this, params);
	}

	getId() {
		return internal.get(this).id;
	}

	getName() {
		return internal.get(this).name;
	}

	toJSON() {
		return internal.get(this);
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
