import promisify from 'es6-promisify';
import { parseString } from 'xml2js';
import parseFencers from './fencers';
import parseTournaments from './tournaments';

const parseXml = promisify(parseString);

export default async function parseAskfredXml(xmlString) {
  const rawJson = await parseXml(xmlString, { async: true });
  const fencers = parseFencers(rawJson);
  const { tournaments, events } = parseTournaments(rawJson);
  return { rawJson, fencers, tournaments, events };
}
