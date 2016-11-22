// ctx requires property assignments, so:
/* eslint no-param-reassign: ["error", { "props": false }] */
import Router from 'koa-router';
import data from '../sample-data';

const router = new Router({ prefix: '/api' });

router.get('/ping', (ctx) => {
  ctx.body = 'pong';
});

router.get('/fred', async (ctx) => {
  const { raw } = await data;
  ctx.body = raw;
});

router.get('/fencers', async (ctx) => {
  const { fencers } = await data;
  const fencerList = Object.values(fencers);
  if (ctx.query.search) {
    ctx.body = fencerList.filter(f => f.firstName.toLowerCase() === ctx.query.search.toLowerCase());
  } else {
    ctx.body = fencerList;
  }
});

router.get('/fencers/:id', async (ctx) => {
  const { fencers } = await data;
  const { id } = ctx.params;
  if (!fencers[id]) {
    ctx.status = 404;
  } else {
    ctx.body = fencers[id];
  }
});

export default router.routes();
export const allowedMethods = router.allowedMethods();
