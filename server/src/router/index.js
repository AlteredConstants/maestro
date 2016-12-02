import Router from 'koa-router';
import prettyPrint from 'koa-json';
import api from './api';
import sampleData from './sampleData';

const router = new Router();
router.use(prettyPrint());
router.use('/api', api.routes(), api.allowedMethods());
router.use('/sample_data', sampleData.routes());

export default router;
