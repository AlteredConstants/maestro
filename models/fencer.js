const internal = new WeakMap();

class Fencer {
	constructor(params) {
		if (!params.id)
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
		if (fencer instanceof Fencer) {
			return fencer.getId();
		} else if (Number.isInteger(fencer)) {
			return fencer;
		} else {
			throw Error('Not a valid Fencer or Fencer ID.');
		}
	}
}

export default Fencer;
