import is from 'check-types';

function splitFirst(keyPath) {
  const splitKeyPath = is.string(keyPath) ? keyPath.split('.') : keyPath;
  return { key: splitKeyPath.shift(), remainingPath: splitKeyPath };
}

export function getField(fields, keyPath) {
  if (is.not.assigned(fields)) {
    return null;
  }
  const { key, remainingPath } = splitFirst(keyPath);
  if (remainingPath.length === 0) {
    return fields[key];
  }
  return getField(fields[key], remainingPath);
}

export function setField(fields, keyPath, value) {
  if (is.not.assigned(fields)) {
    return;
  }
  const { key, remainingPath } = splitFirst(keyPath);
  if (remainingPath.length === 0) {
    fields[key] = value;
    return;
  }
  setField(fields[key], remainingPath, value);
}
