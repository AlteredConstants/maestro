import 'source-map-support/register';
import path from 'path';
import Koa from 'koa';
import Router from 'koa-router';
import prettyPrint from 'koa-json';
import Datastore from 'nedb-promise';
import { connect } from 'camo';
import apiRouter from './routes/api';
import sampleDataRouter from './routes/sampleData';

const datastoreDirPath = path.join(__dirname, '../.temp/datastores');

const router = new Router();
router.use('/api', apiRouter.routes(), apiRouter.allowedMethods());
router.use('/sample_data', sampleDataRouter.routes());

const app = new Koa();
app.use(prettyPrint());
app.use(router.routes());

Promise.resolve()
.then(() => new Datastore({ filename: path.join(datastoreDirPath, 'fencers.db'), autoload: true }))
.then(() => connect(`nedb://${datastoreDirPath}`))
.then(() => app.listen(3000, () => console.log('Server started.')))
.catch(error => console.error(error));
