import { camel, snake } from 'change-case';
import is from 'check-types';
import { curry } from 'lodash/fp';

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

export const camelifyKeys = changeCase(camel);
export const snakifyKeys = changeCase(snake);

export default {
  camelifyKeys,
  snakifyKeys,
};
