import is from 'check-types';
import promisify from 'es6-promisify';
import { parseString } from 'xml2js';

export { camelify, snakify } from 'util/ChangeCase';
export { default as runModelQueryActionWithDeepPopulate } from 'util/runModelQueryActionWithDeepPopulate';

export const parseXmlString = xmlString => promisify(parseString)(xmlString, { async: true });

export function ensureNonEmptyArray(itemOrArray) {
  if (!itemOrArray) return null;
  if (is.not.array(itemOrArray)) return [itemOrArray];
  if (itemOrArray.length < 1) return null;
  if (!itemOrArray.every(Boolean)) return null;
  return itemOrArray;
}
