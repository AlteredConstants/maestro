import Immutable from 'immutable';
import is from 'check-types';
import getArgumentNames from 'get-parameter-names';
import {getField, setField} from 'utilities/key_path';

function forEach(obj, transformation, fields) {
	if (is.assigned(obj)) {
		Object.keys(obj).forEach(keyPath => transformation(obj[keyPath], keyPath, fields));
	}
}

function applyDefault(defaultSetter, keyPath, fields) {
	if (is.not.assigned(getField(fields, keyPath))) {
		setField(fields, keyPath, is.function(defaultSetter) ? defaultSetter() : defaultSetter);
	}
}

function getDenormalized(denormalizer, field) {
	return is.instance(field, denormalizer.model) ? field : denormalizer.run(field);
}

function applyDenormalization(denormalizer, keyPath, fields) {
	let field = getField(fields, keyPath);
	if (is.not.assigned(field)) {
		return;
	}
	let denormalizedField;
	if (is.not.string(field) && is.function(field[Symbol.iterator])) {
		denormalizedField = Immutable.Map().withMutations(fieldMap => {
			field
				.map(fieldItem => getDenormalized(denormalizer, fieldItem))
				.forEach(fieldItem => fieldMap.set(fieldItem.id, fieldItem));
		});
		denormalizedField = Immutable.Map(denormalizedField);
	} else {
		denormalizedField = getDenormalized(denormalizer, field);
	}
	setField(fields, keyPath, denormalizedField);
}

function applyTranslation(translation, keyPath, fields) {
	let baseArgs = getArgumentNames(translation).map(name => getField(fields, name));
	if (baseArgs.every(arg => is.assigned(arg))) {
		setField(fields, keyPath, translation(...baseArgs));
	}
}

export default class FieldBuilder {
	constructor(fields) {
		this.fields = is.assigned(fields) ? fields : {};
	}

	setDefaults(defaults) {
		forEach(defaults, applyDefault, this.fields);
		return this;
	}

	denormalize(denormalizers) {
		forEach(denormalizers, applyDenormalization, this.fields);
		return this;
	}

	translate(translations) {
		forEach(translations, applyTranslation, this.fields);
		return this;
	}

	toImmutable() {
		return Immutable.Map(this.fields);
	}
}
