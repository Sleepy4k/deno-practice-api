import "https://deno.land/x/dotenv@v3.2.2/load.ts";

const Credentials = {
  user: Deno.env.get("DB_USER"),
  database: Deno.env.get("DB_NAME"),
  hostname: Deno.env.get("DB_HOST"),
  port: Deno.env.get("DB_PORT"),
  password: Deno.env.get("DB_PASS"),
  tls: {
    enabled: false
  }
};

export default Credentials;