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
  return tournamentNodeList.reduce((result, nextNode) => {
    const [tournament, events] = parseTournament(nextNode);
    result.tournaments.push(tournament);
    result.events = result.events.concat(events);
    return result;
  }, { tournaments: [], events: [] });
}
