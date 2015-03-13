import Immutable from 'immutable';
import is from 'check-types';
import getParameterNames from 'get-parameter-names';

class FieldBuilder {
	constructor(params) {
		this.params = is.assigned(params) ? params : {};
	}

	setDefaults(defaults) {
		if (is.not.assigned(defaults))
			return this;

		for (let key of Object.keys(defaults)) {
			let getDefault = defaults[key];
			if (is.not.assigned(this.params[key]))
				this.params[key] = is.function(getDefault) ? getDefault() : getDefault;
		}
		return this;
	}

	translate(translations) {
		if (is.not.assigned(translations))
			return this;

		for (let key of Object.keys(translations)) {
			let getTranslation = translations[key];
			let baseParams = getParameterNames(getTranslation).map(n => this.params[n]);
			if (baseParams.every(param => is.not.undefined(param)))
				this.params[key] = getTranslation(...baseParams);
		}
		return this;
	}

	toImmutable() {
		return Immutable.Map(this.params);
	}
}

export default class Model {
	constructor(params, internal, operations) {
		internal.set(this,
			new FieldBuilder(params)
				.setDefaults(operations.defaults)
				.translate(operations.translations)
				.toImmutable());
	}
}
