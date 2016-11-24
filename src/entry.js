import 'source-map-support/register';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import prettyPrint from 'koa-json';
import routes, { allowedMethods } from './routes/api';
import fixCase from './fixCase';

const app = new Koa();

app
.use(bodyParser())
.use(prettyPrint())
.use(fixCase)
.use(routes)
.use(allowedMethods)
.use(async (ctx) => {
  ctx.body = 'Hello World!';
});

app.listen(3000, () => console.log('Server started.'));
