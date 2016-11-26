import Router from 'koa-router';
import Tournament from '../model/Tournament';

const router = new Router();

router.get('/', async (ctx) => {
  const tournaments = await Tournament.find({});
  ctx.body = tournaments.map(t => t.toJSON());
});

router.get('/:id', async (ctx) => {
  const { id } = ctx.params;
  const tournament = await Tournament.findOne({ _id: id });
  if (!tournament) {
    ctx.status = 404;
  } else {
    ctx.body = tournament.toJSON();
  }
});

router.get('/:id/events', async (ctx) => {
  const { id } = ctx.params;
  const tournament = await Tournament.findOne({ _id: id });
  ctx.body = tournament.events.map(e => e.toJSON());
});

export default router;
