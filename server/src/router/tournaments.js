import Router from 'koa-router';
import Tournament from 'model/Tournament';

const router = new Router();

router.get('/', async (ctx) => {
  const { populate } = ctx.query;
  // TODO: Listify (and escape) `populate` query param.
  const options = populate ? { populate: [populate] } : undefined;
  const tournaments = await Tournament.find({}, options);
  ctx.body = tournaments.map(t => t.toJSON());
});

router.get('/:id', async (ctx) => {
  const { id } = ctx.params;
  const { populate } = ctx.query;
  // TODO: Listify (and escape) `populate` query param.
  const options = populate ? { populate: [populate] } : undefined;
  const tournament = await Tournament.findOne({ _id: id }, options);
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
