import fs from 'fs';
import promisify from 'es6-promisify';
import Router from 'koa-router';
import parseAskfredXml from '../parser/askfredXml';
import Fencer from '../model/Fencer';
import Tournament from '../model/Tournament';
import Event from '../model/Event';

const readFile = promisify(fs.readFile);

async function getSampleData() {
  const xmlString = await readFile('./data/2012-gopher-open.frd.xml', 'utf8');
  return parseAskfredXml(xmlString);
}

const router = new Router();

router.get('/', async (ctx) => {
  const { rawJson } = await getSampleData();
  ctx.body = rawJson;
});

router.get('/reload', async (ctx) => {
  const [{ fencers, tournaments, events }] = await Promise.all([
    getSampleData(),
    Fencer.deleteMany(),
    Tournament.deleteMany(),
    Event.deleteMany(),
  ]);
  await Promise.all(fencers.map(f => Fencer.create(f).save()));
  await Promise.all(events.map(async ({ preregisteredFencers, ...eventObj }) => {
    const event = Event.create(eventObj);
    event.preregisteredFencers = await Fencer.find({ askfredId: { $in: preregisteredFencers } });
    return event.save();
  }));
  await Promise.all(tournaments.map(async (tournamentObj) => {
    const tournament = Tournament.create(tournamentObj);
    tournament.events = await Event.find({ askfredTournamentId: tournament.askfredId });
    return tournament.save();
  }));
  ctx.body = 'ok';
});

export default router;
