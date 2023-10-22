import { UserController } from './../controllers/_index.ts';
import { Router } from 'https://deno.land/x/oak@v12.6.0/mod.ts';

const router = new Router();

router.get('/user', UserController.index);
router.post('/user', UserController.create);
router.get('/user/:id', UserController.find);
router.patch('/user/:id', UserController.update);
router.delete('/user/:id', UserController.destroy);

export default router;