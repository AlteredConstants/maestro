import promisify from 'es6-promisify';
import { parseString } from 'xml2js';

export * from 'util/ChangeCase';

export const parseXmlString = xmlString => promisify(parseString)(xmlString, { async: true });
