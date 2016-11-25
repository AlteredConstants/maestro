import 'source-map-support/register';
import path from 'path';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import prettyPrint from 'koa-json';
import Datastore from 'nedb-promise';
import { connect } from 'camo';
import ApiError from './ApiError';
import routes, { allowedMethods } from './routes/api';
import fixCase from './fixCase';

const datastoreDirPath = path.join(__dirname, '../.temp/datastores');
const app = new Koa();

app
.use(bodyParser())
.use(prettyPrint())
.use(async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    if (!(error instanceof ApiError)) throw error;
    ctx.status = error.statusCode;
    ctx.body = error;
  }
})
.use(fixCase)
.use(routes)
.use(allowedMethods);

Promise.resolve()
.then(() => new Datastore({ filename: path.join(datastoreDirPath, 'fencers.db'), autoload: true }))
.then(() => connect(`nedb://${datastoreDirPath}`))
.then(() => app.listen(3000, () => console.log('Server started.')))
.catch(error => console.error(error));
