import { zipAll, flatten } from 'lodash/fp';

function parsePreregistrations(eventNode) {
  return eventNode.PreReg.map(preRegNode => preRegNode.$.CompetitorID);
}

function parseEvent(askfredTournamentId, eventNode) {
  const {
    EventID: askfredId,
    Description: description,
    Weapon: weapon,
    EventDateTime: date,
  } = eventNode.$;
  const preregisteredFencers = parsePreregistrations(eventNode);
  return {
    askfredId,
    askfredTournamentId,
    description,
    weapon: weapon.toLowerCase(),
    date: new Date(date),
    preregisteredFencers,
  };
}

function parseTournament(tournamentNode) {
  const {
    TournamentID: askfredId,
    Name: name,
  } = tournamentNode.$;
  const parseEventWithId = eventNode => parseEvent(askfredId, eventNode);
  const events = tournamentNode.Event.map(parseEventWithId);
  return [{ askfredId, name }, events];
}

export default function parseTournaments(documentRoot) {
  const tournamentNodeList = documentRoot.FencingData.Tournament;
  // Zip together the array of [tournament, [event]] tuples from parseTournament.
  const [tournaments, events] = zipAll(tournamentNodeList.map(parseTournament));
  return { tournaments, events: flatten(events) };
}
