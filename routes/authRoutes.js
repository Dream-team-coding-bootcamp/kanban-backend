import { Router } from 'express';
import { register, login, prueba } from '../controllers/authController.js';

const router = Router();

router.get('/prueba', prueba);
router.post('/register', register);
router.post('/login', login);

export default router;
