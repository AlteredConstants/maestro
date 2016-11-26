import 'source-map-support/register';
import path from 'path';
import Koa from 'koa';
import Datastore from 'nedb-promise';
import { connect } from 'camo';
import router from './router';

const datastoreDirPath = path.join(__dirname, '../.temp/datastores');

const app = new Koa();
app.use(router.routes());

Promise.resolve()
.then(() => new Datastore({ filename: path.join(datastoreDirPath, 'fencers.db'), autoload: true }))
.then(() => connect(`nedb://${datastoreDirPath}`))
.then(() => app.listen(3000, () => console.log('Server started.')))
.catch(error => console.error(error));
