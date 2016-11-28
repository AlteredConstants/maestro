import { escapeRegExp, curry } from 'lodash/fp';
import { InvalidBooleanQuery } from 'ApiError';

function convertBooleanToExistence(input) {
  if (input === '' || input === 'true') {
    return { $exists: true };
  }
  if (input === 'false') {
    return { $exists: false };
  }
  return undefined;
}

function $mapBooleanToExistence(booleanPropName, backingPropName, query) {
  const { [booleanPropName]: booleanProp, ...newQuery } = query;
  if (booleanProp !== undefined) {
    const backingPropQuery = convertBooleanToExistence(booleanProp);
    if (backingPropQuery) {
      newQuery[backingPropName] = backingPropQuery;
    } else {
      throw new InvalidBooleanQuery({ [booleanPropName]: booleanProp });
    }
  }
  return newQuery;
}
export const mapBooleanToExistence = curry($mapBooleanToExistence);

function $matchPartial(propName, query) {
  const value = query[propName];
  let newQuery = query;
  if (value !== undefined) {
    newQuery = {
      ...query,
      [propName]: { $regex: new RegExp(escapeRegExp(value), 'i') },
    };
  }
  return newQuery;
}
export const matchPartial = curry($matchPartial);

function $checkAny(groupPropName, targetPropNames, query) {
  const { [groupPropName]: groupProp, ...newQuery } = query;
  if (groupProp !== undefined) {
    const orQueries = targetPropNames.map(targetPropName => ({
      [targetPropName]: groupProp,
    }));
    const existingOrQueries = newQuery.$or || [];
    newQuery.$or = [...existingOrQueries, ...orQueries];
  }
  return newQuery;
}
export const checkAny = curry($checkAny);

function $makeCaseInsensitive(propNames, query) {
  const newQuery = { ...query };
  const propEntries = Object.entries(newQuery)
    .filter(([propName]) => propNames.includes(propName));
  if (propEntries.length > 0) {
    propEntries.forEach(([name, value]) => {
      newQuery[name] = { $regex: new RegExp(`^${escapeRegExp(value)}$`, 'i') };
    });
  }
  return newQuery;
}
export const makeCaseInsensitive = curry($makeCaseInsensitive);
