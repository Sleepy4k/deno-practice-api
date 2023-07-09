import { Response } from 'https://deno.land/x/oak@v12.6.0/mod.ts';
import type { ResponseType } from '../types/index.ts';

const response_json = (res: Response, code: number, data: ResponseType) => {
  code = code || 200;

  res.status = 200;
  res.headers.set('Content-Type', 'application/json');
  res.body = JSON.stringify(data);

  return res;
};

export {
  response_json
};