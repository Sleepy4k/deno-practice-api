import router from './routes.ts';
import { Application } from 'https://deno.land/x/oak@v12.6.0/mod.ts';

const app = new Application();
const port = 8000;

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Server running on port ${port}`);

await app.listen({ port: port });