import { user } from './controllers/index.ts';
import { Router } from 'https://deno.land/x/oak@v12.6.0/mod.ts';

const router = new Router();

router.get('/user', user.index);
router.post('/user', user.create);
router.get('/user/:id', user.find);
router.put('/user/:id', user.update);
router.delete('/user/:id', user.destroy);

export default router;