import { zip } from 'lodash';

function parsePreregistration(preregistrationNode) {
  return preregistrationNode.$.CompetitorID;
}

function parseEvent(askfredTournamentId, eventNode) {
  const {
    EventID: askfredId,
    Description: description,
    Weapon: weapon,
    EventDateTime: date,
  } = eventNode.$;
  const preregisteredFencers = eventNode.PreReg.map(parsePreregistration);
  return {
    askfredId,
    askfredTournamentId,
    description,
    weapon: weapon.toLowerCase(),
    date: new Date(date),
    preregisteredFencers,
  };
}

function parseTournamentNode(tournamentNode) {
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
  const [tournaments, [events]] = zip(...tournamentNodeList.map(parseTournamentNode));
  return { tournaments, events };
}
