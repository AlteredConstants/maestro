import { camelifyKeys, snakifyKeys } from './util/ChangeCase';

export default async function fixCase(ctx, next) {
  ctx.query = camelifyKeys(ctx.query);
  if (ctx.request.is('json')) {
    ctx.request.body = camelifyKeys(ctx.request.body);
  }
  await next();
  if (ctx.response.is('json')) {
    ctx.response.body = snakifyKeys(ctx.response.body);
  }
}
