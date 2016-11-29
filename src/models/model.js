import Immutable from 'immutable';
import is from 'check-types';
import FieldBuilder from 'models/field_builder';

const baseInternal = new WeakMap();
const normalizedFieldsByModel = new WeakMap();

function isHomogeneousByModel(iterable) {
  let type;
  return iterable.every((item) => {
    if (is.not.assigned(type)) {
      // This function is only ever called from Model.
      // eslint-disable-next-line no-use-before-define
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
  // This function is only ever called from Model.
  // eslint-disable-next-line no-use-before-define
  if (is.instance(field, Model)) {
    return field.id;
  } else if (is.instance(field, Immutable.Iterable)) {
    let normalized = field.map(normalize);
    if (isHomogeneousByModel(field)) {
      normalized = normalized.toList();
    }
    return normalized;
  }
  return field;
}

export default class Model {
  constructor(params, internal, operations) {
    internal.set(this,
      new FieldBuilder(params)
        .setDefaults(operations.defaults)
        .denormalize(operations.denormalizers)
        .translate(operations.translations)
        .toImmutable(),
    );
    baseInternal.set(this.constructor, internal);
    if (!normalizedFieldsByModel.has(this.constructor) &&
      is.assigned(operations.denormalizers)) {
      const normalizedFields = Object.keys(operations.denormalizers);
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
