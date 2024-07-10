import { Router } from 'express'
import { register, login, update } from '../controllers/authController.ts'
import validate from '../middleware/validate.ts'
import { userRegisterSchema, userLoginSchema, userUpdateSchema } from '../schemas/userSchema.ts'
import auth from '../middleware/auth.ts'

const router = Router()

router.post('/register', validate(userRegisterSchema), register)
router.post('/login', validate(userLoginSchema), login)
router.put('/update', auth, validate(userUpdateSchema), update)

export default router
