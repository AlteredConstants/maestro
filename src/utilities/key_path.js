import is from 'check-types';

function splitFirst(keyPath) {
  if (is.string(keyPath)) {
    keyPath = keyPath.split('.');
  }
  return { key: keyPath.shift(), remainingPath: keyPath };
}

export function getField(fields, keyPath) {
  if (is.not.assigned(fields)) {
    return;
  }
  let { key, remainingPath } = splitFirst(keyPath);
  if (remainingPath.length === 0) {
    return fields[key];
  }
  return getField(fields[key], remainingPath);
}

export function setField(fields, keyPath, value) {
  if (is.not.assigned(fields)) {
    return;
  }
  let { key, remainingPath } = splitFirst(keyPath);
  if (remainingPath.length === 0) {
    fields[key] = value;
    return;
  }
  setField(fields[key], remainingPath, value);
}
