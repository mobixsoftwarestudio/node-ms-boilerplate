import { Router } from 'express';
import passport from 'passport';
import { login, protectedRoute } from './controllers';

const router = Router();

router.post('/login', login);
router.get('/protected', passport.authenticate('jwt', { session: false }), protectedRoute);

export default router;
