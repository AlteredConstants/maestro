import { parseXmlString } from 'util';
import parseFencers from './fencers';
import parseTournaments from './tournaments';

export default async function parseAskfredXml(xmlString) {
  const rawJson = await parseXmlString(xmlString);
  const fencers = parseFencers(rawJson);
  const { tournaments, events } = parseTournaments(rawJson);
  return { rawJson, fencers, tournaments, events };
}
