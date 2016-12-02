import { flow } from 'lodash/fp';
import Router from 'koa-router';
import Fencer from 'model/Fencer';
import Event from 'model/Event';
import {
  mapBooleanToExistence,
  matchPartial,
  checkAny,
  makeCaseInsensitive,
} from 'util/QueryTransforms';

const router = new Router();

const rootQueryTranform = flow(
  mapBooleanToExistence('isUsfaMember', 'usfaId'),
  matchPartial('partialName'),
  checkAny('partialName', ['firstName', 'lastName']),
  makeCaseInsensitive(['firstName', 'lastName', 'gender']),
);

router.get('/', async (ctx) => {
  const query = rootQueryTranform(ctx.query);
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

router.post('/', async (ctx) => {
  const fencer = Fencer.create(ctx.request.body);
  await fencer.save();
  ctx.body = fencer.toJSON();
});

router.delete('/:id', async (ctx) => {
  const { id } = ctx.params;
  await Fencer.deleteOne({ _id: id });
  ctx.status = 204;
});

export default router;
