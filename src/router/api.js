import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import fixCase from '../fixCase';
import { apiErrorHandler } from '../ApiError';
import fencersRouter from './fencers';
import tournamentsRouter from './tournaments';

const router = new Router();

router.use(
  bodyParser(),
  apiErrorHandler,
  fixCase,
);

router.get('/ping', (ctx) => {
  ctx.body = 'pong';
});

router.use('/fencers', fencersRouter.routes());
router.use('/tournaments', tournamentsRouter.routes());

export default router;
