import Router from 'koa-router';
import getSampleData from '../getSampleData';
import Fencer from '../model/Fencer';
import transformQuery, {
  mapBooleanToExistence,
  matchPartial,
  checkAny,
  makeCaseInsensitive,
} from './transformQuery';

const router = new Router({ prefix: '/api' });

router.get('/ping', (ctx) => {
  ctx.body = 'pong';
});

router.get('/fred', async (ctx) => {
  const { raw } = await getSampleData();
  ctx.body = raw;
});

router.get('/fencers', async (ctx) => {
  const query = transformQuery(ctx.query, [
    mapBooleanToExistence('isUsfaMember', 'usfaId'),
    matchPartial('partialName'),
    checkAny('partialName', 'firstName', 'lastName'),
    makeCaseInsensitive('firstName', 'lastName', 'gender'),
  ]);
  const fencers = await Fencer.find(query);
  ctx.body = fencers.map(f => f.toJSON());
});

router.get('/fencers/:askfredId', async (ctx) => {
  const { askfredId } = ctx.params;
  const fencer = await Fencer.findOne({ askfredId });
  if (!fencer) {
    ctx.status = 404;
  } else {
    ctx.body = fencer.toJSON();
  }
});

router.post('/fencers', (ctx) => {
  console.log(ctx.request.body);
});

router.get('/reload_sample_data', async (ctx) => {
  const [{ fencers }] = await Promise.all([
    getSampleData(),
    Fencer.deleteMany(),
  ]);
  await Promise.all(fencers.map(f => Fencer.create(f).save()));
  ctx.body = 'ok';
});

export default router.routes();
export const allowedMethods = router.allowedMethods();
