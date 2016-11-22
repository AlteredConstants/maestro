import 'source-map-support/register';
import Koa from 'koa';
import routes, { allowedMethods } from './routes/api';

const app = new Koa();


app
.use(routes)
.use(allowedMethods)
.use(async (ctx) => {
  ctx.body = 'Hello World!';
});

app.listen(3000, () => console.log('Server started.'));
