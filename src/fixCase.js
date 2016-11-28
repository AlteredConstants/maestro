import { camelify, snakify } from 'util';

export default async function fixCase(ctx, next) {
  ctx.query = camelify.objectKeys(ctx.query);
  if (ctx.request.is('json')) {
    ctx.request.body = camelify.objectKeys(ctx.request.body);
  }
  await next();
  if (ctx.response.is('json')) {
    ctx.response.body = snakify.objectKeys(ctx.response.body);
  }
}
