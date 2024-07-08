import { Router } from 'express';
import { register, login, update } from '../controllers/authController.js';
import auth from '../middleware/auth.js'; 

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.put('/update/:id', update);

export default router;
