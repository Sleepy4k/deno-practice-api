import { Credentials } from '../configs/_index.ts';
import { Client } from 'https://deno.land/x/postgres@v0.17.0/mod.ts';

const Database = new Client(Credentials);

export {
  Database
};