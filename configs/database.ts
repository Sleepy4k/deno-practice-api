import "https://deno.land/x/dotenv@v3.2.2/load.ts";
import { Client } from 'https://deno.land/x/postgres@v0.17.0/mod.ts';

const Credentials = {
  user: Deno.env.get("DB_USER") || "postgres",
  database: Deno.env.get("DB_NAME") || "deno_api",
  hostname: Deno.env.get("DB_HOST") || "localhost",
  port: parseInt(Deno.env.get("DB_PORT") || "5432"),
  password: Deno.env.get("DB_PASS") || "postgres",
  tls: {
    enabled: false
  }
};

const Database = new Client(Credentials)

Database.connect()
  .catch((err) => {
    console.log(err);
  }).finally(() => {
    console.log('Database connected');
  });

export default Database;
