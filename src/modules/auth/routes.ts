import { Router } from 'express';
import { protect, login } from './controllers';
import passport from 'passport';
const router = Router();

router.post('/login', login);
router.get('/protected', passport.authenticate('jwt', { session: false }), protect);

export default router;
