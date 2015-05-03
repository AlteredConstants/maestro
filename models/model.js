import Immutable from 'immutable';
import is from 'check-types';
import FieldBuilder from 'models/field_builder';

let baseInternal = new WeakMap();
let normalizedFieldsByModel = new WeakMap();

function isHomogeneousByModel(iterable) {
	let type;
	return iterable.every(function(item) {
		if (is.not.assigned(type)) {
			if (is.not.instance(item, Model)) {
				return false;
			}
			type = item.constructor;
			return true;
		}
		return is.instance(item, type);
	});
}

function normalize(field) {
	if (is.instance(field, Model)) {
		return field.id;
	} else if (is.instance(field, Immutable.Iterable)) {
		let normalized = field.map(normalize);
		if (isHomogeneousByModel(field)) {
			normalized = normalized.toList();
		}
		return normalized;
	} else {
		return field;
	}
}

export default class Model {
	constructor(params, internal, operations) {
		internal.set(this,
			new FieldBuilder(params)
				.setDefaults(operations.defaults)
				.denormalize(operations.denormalizers)
				.translate(operations.translations)
				.toImmutable()
		);
		baseInternal.set(this.constructor, internal);
		if (!normalizedFieldsByModel.has(this.constructor) &&
			is.assigned(operations.denormalizers)) {
			let normalizedFields = Object.keys(operations.denormalizers);
			normalizedFieldsByModel.set(this.constructor, normalizedFields);
		}
	}

	get id() {
		return baseInternal.get(this.constructor).get(this).get('id');
	}

	serialize() {
		return baseInternal.get(this.constructor).get(this).map(normalize);
	}

	toJSON() {
		return this.serialize().toJSON();
	}
}
