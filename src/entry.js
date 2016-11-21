import 'source-map-support/register';
import Koa from 'koa';

const app = new Koa();

app.use(async (ctx) => {
  console.log('Hi.');
  ctx.body = 'Hello World!';
});

console.log('Starting server...');
app.listen(3000);
