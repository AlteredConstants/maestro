import escapeStringRegexp from 'escape-string-regexp';
import { InvalidBooleanQuery } from '../ApiError';

function convertBooleanToExistence(input) {
  if (input === '' || input === 'true') {
    return { $exists: true };
  }
  if (input === 'false') {
    return { $exists: false };
  }
  return undefined;
}

export function mapBooleanToExistence(booleanPropName, backingPropName) {
  return (query) => {
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
  };
}

export function matchPartial(propName) {
  return (query) => {
    const value = query[propName];
    let newQuery = query;
    if (value !== undefined) {
      newQuery = {
        ...query,
        [propName]: { $regex: new RegExp(escapeStringRegexp(value), 'i') },
      };
    }
    return newQuery;
  };
}

export function checkAny(groupPropName, ...targetPropNames) {
  return (query) => {
    const { [groupPropName]: groupProp, ...newQuery } = query;
    if (groupProp !== undefined) {
      const orQueries = targetPropNames.map(targetPropName => ({
        [targetPropName]: groupProp,
      }));
      const existingOrQueries = newQuery.$or || [];
      newQuery.$or = [...existingOrQueries, ...orQueries];
    }
    return newQuery;
  };
}

export function makeCaseInsensitive(...propNames) {
  return (query) => {
    const newQuery = { ...query };
    const propEntries = Object.entries(newQuery)
      .filter(([propName]) => propNames.includes(propName));
    if (propEntries.length > 0) {
      propEntries.forEach(([name, value]) => {
        newQuery[name] = { $regex: new RegExp(`^${escapeStringRegexp(value)}$`, 'i') };
      });
    }
    return newQuery;
  };
}

export default function transformQuery(query, transformations) {
  return transformations.reduce((newQuery, applyNext) => applyNext(newQuery), query);
}
