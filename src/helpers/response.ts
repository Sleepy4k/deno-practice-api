import type { ResponseType } from '../types/_index.ts';
import { Context, Status } from 'https://deno.land/x/oak@v12.6.0/mod.ts';

const response_json = (ctx: Context, code: Status, data: ResponseType) => {
  ctx.response.status = code;
  ctx.response.headers.set('Content-Type', 'application/json');
  ctx.response.body = JSON.stringify(data);
  return ctx;
};

export {
  response_json
};