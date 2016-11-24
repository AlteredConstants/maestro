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

const fencerFilters = ['firstName', 'lastName', 'gender', 'isUsfaMember'];

function isFilterMatch(filter, query, fencer) {
  if (filter === 'isUsfaMember') {
    return !!fencer.usfaId;
  }
  const expectedValue = query[filter];
  const actualValue = fencer[filter];
  return expectedValue && actualValue && expectedValue.toLowerCase() === actualValue.toLowerCase();
}

router.get('/fencers', async (ctx) => {
  const { fencers } = await data;
  const fencerList = Object.values(fencers);
  const filters = fencerFilters.filter(f => f in ctx.query);
  if (filters.length > 0) {
    ctx.body = fencerList.filter(fencer => (
      filters.reduce((memo, filter) => memo && isFilterMatch(filter, ctx.query, fencer), true)
    ));
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

router.post('/fencers', (ctx) => {
  console.log(ctx.request.body);
});

export default router.routes();
export const allowedMethods = router.allowedMethods();
