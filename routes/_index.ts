import userRoute from './user.route.ts';
import { Router } from 'https://deno.land/x/oak@v12.6.0/mod.ts';

const router = new Router();

router.use("/api", userRoute.routes());

export default router;