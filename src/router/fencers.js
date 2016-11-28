import Router from 'koa-router';
import Fencer from 'model/Fencer';
import Event from 'model/Event';
import transformQuery, {
  mapBooleanToExistence,
  matchPartial,
  checkAny,
  makeCaseInsensitive,
} from './transformQuery';

const router = new Router();

router.get('/', async (ctx) => {
  const query = transformQuery(ctx.query, [
    mapBooleanToExistence('isUsfaMember', 'usfaId'),
    matchPartial('partialName'),
    checkAny('partialName', 'firstName', 'lastName'),
    makeCaseInsensitive('firstName', 'lastName', 'gender'),
  ]);
  const fencers = await Fencer.find(query);
  ctx.body = fencers.map(f => f.toJSON());
});

router.get('/:id', async (ctx) => {
  const { id } = ctx.params;
  const fencer = await Fencer.findOne({ _id: id });
  if (!fencer) {
    ctx.status = 404;
  } else {
    ctx.body = fencer.toJSON();
  }
});

router.get('/:id/events', async (ctx) => {
  const { id } = ctx.params;
  const events = await Event.find({ preregisteredFencers: id }, { populate: false });
  ctx.body = events.map(e => e.toJSON());
});

router.post('/', (ctx) => {
  // TODO: Implement.
  // eslint-disable-next-line no-console
  console.log(ctx.request.body);
});

export default router;
