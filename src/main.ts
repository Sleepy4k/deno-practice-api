import router from './routes/_index.ts';
import { fallback } from './controllers/_index.ts';
import "https://deno.land/x/dotenv@v3.2.2/load.ts";
import { Application, isHttpError } from 'https://deno.land/x/oak@v12.6.0/mod.ts';

const app = new Application();
const host = Deno.env.get("APP_HOST") || "localhost";
const port = Deno.env.get("APP_PORT") || "8000";

// Logger
app.use(async (context, next) => {
  await next();
  const rt = context.response.headers.get("X-Response-Time");
  console.log(`${context.request.method} ${decodeURIComponent(context.request.url.pathname)} - ${String(rt)}`);
});

// Response Time
app.use(async (context, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  context.response.headers.set("X-Response-Time", `${ms}ms`);
});

// Error handler
app.use(async (context, next) => {
  try {
    await next();
  } catch (err) {
    if (isHttpError(err)) {
      context.response.status = err.status;
      const { message, status, stack } = err;
      if (context.request.accepts("json")) {
        context.response.body = { message, status, stack };
        context.response.type = "json";
      } else {
        context.response.body = `${status} ${message}\n\n${stack ?? ""}`;
        context.response.type = "text/plain";
      }
    } else {
      console.log(err);
      throw err;
    }
  }
});

// Register routes and middlewares
app.use(router.routes());
app.use(router.allowedMethods());

// Not Found
app.use(fallback.notfound);

// Listen event
app.addEventListener("listen", ({ hostname, port, serverType }) => {
  console.log(`Server running on ${hostname}:${port}`);
  console.log(`using HTTP server: ${serverType}`);
});

await app.listen({
  hostname: host,
  port: parseInt(port)
});