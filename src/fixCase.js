import toCase from 'change-case-object';

export default async function fixCase(ctx, next) {
  ctx.query = toCase.camel(ctx.query);
  if (ctx.request.is('json')) {
    ctx.request.body = toCase.camel(ctx.request.body);
  }
  await next();
  if (ctx.response.is('json')) {
    ctx.response.body = toCase.snake(ctx.response.body);
  }
}
