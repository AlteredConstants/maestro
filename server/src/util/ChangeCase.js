import is from 'check-types';
import { curry, camelCase, snakeCase } from 'lodash/fp';

const changeCase = curry((transformer, obj) => {
  if (is.array(obj)) {
    return obj.map(changeCase(transformer));
  } else if (is.object(obj)) {
    return Object.entries(obj).reduce((newObject, [key, value]) => {
      newObject[transformer(key)] = changeCase(transformer, value);
      return newObject;
    }, {});
  }
  return obj;
});

export const camelify = (...x) => camelCase(...x);
export const snakify = (...x) => snakeCase(...x);

camelify.objectKeys = changeCase(camelCase);
snakify.objectKeys = changeCase(snakeCase);
