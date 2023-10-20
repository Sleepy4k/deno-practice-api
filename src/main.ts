import router from './routes/_index.ts';
import { Status, Application } from 'https://deno.land/x/oak@v12.6.0/mod.ts';

const app = new Application();
const port = 8000;

app.use(router.routes());
app.use(router.allowedMethods());

app.use((ctx) => {
  ctx.response.status = Status.NotFound;
  ctx.response.headers.set('Content-Type', 'application/json');
  ctx.response.body = JSON.stringify({
    success: false,
    message: 'Route Not Found',
    data: []
  });
});

console.log(`Server running on port ${port}`);

await app.listen({ port: port });