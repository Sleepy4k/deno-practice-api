import { response_json } from '../helpers/_index.ts';
import { Status, Context } from 'https://deno.land/x/oak@v12.6.0/mod.ts';

/**
 * @desc Handle not found route
 * 
 * @param context Context
 * 
 * @return void
 */
const notfound = (context: Context) => {
  response_json(context, Status.NotFound, {
    success: false,
    message: 'Route Not Found',
    data: []
  });
};

export {
  notfound
};