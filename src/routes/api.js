import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import fixCase from '../fixCase';
import { apiErrorHandler } from '../ApiError';
import Fencer from '../model/Fencer';
import transformQuery, {
  mapBooleanToExistence,
  matchPartial,
  checkAny,
  makeCaseInsensitive,
} from './transformQuery';

const router = new Router();

router.use(
  bodyParser(),
  apiErrorHandler,
  fixCase,
);

router.get('/ping', (ctx) => {
  ctx.body = 'pong';
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

export default router;
