import is from 'check-types';
import Model from 'models/model';

const internal = new WeakMap();

const defaults = {
	id: () => Date.now()
};

export default class Fencer extends Model {
	constructor(params) {
		super(params, internal, {defaults});
	}

	get id() {
		return internal.get(this).get('id');
	}

	get name() {
		return internal.get(this).get('name');
	}

	toJSON() {
		return internal.get(this).toJSON();
	}

	static getId(fencer) {
		if (is.instance(fencer, Fencer)) {
			return fencer.id;
		} else if (is.integer(fencer)) {
			return fencer;
		} else {
			throw Error('Not a valid Fencer or Fencer ID.');
		}
	}
}
