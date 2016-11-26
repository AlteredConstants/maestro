import Router from 'koa-router';
import getSampleData from '../getSampleData';
import Fencer from '../model/Fencer';

const router = new Router();

router.get('/', async (ctx) => {
  const { raw } = await getSampleData();
  ctx.body = raw;
});

router.get('/reload', async (ctx) => {
  const [{ fencers }] = await Promise.all([
    getSampleData(),
    Fencer.deleteMany(),
  ]);
  await Promise.all(fencers.map(f => Fencer.create(f).save()));
  ctx.body = 'ok';
});

export default router;
