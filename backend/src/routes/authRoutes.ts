import { Router } from 'express';
import { register, login } from '../controllers/authController';
import { validateAuth } from '../middleware/validate';

const router = Router();

router.post('/register', validateAuth, register);
router.post('/login', validateAuth, login);

export default router;