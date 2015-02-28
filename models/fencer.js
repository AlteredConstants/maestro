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
}

export default Fencer;
