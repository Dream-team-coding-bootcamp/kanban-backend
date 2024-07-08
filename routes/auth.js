import { Router } from 'express'
import { register, login, update } from '../controllers/authController.js'
import validate from '../middleware/validate.js'
import { userRegisterSchema, userLoginSchema, userUpdateSchema } from '../schemas/userSchema.js'
import auth from '../middleware/auth.js'

const router = Router()

router.post('/register', validate(userRegisterSchema), register)
router.post('/login', validate(userLoginSchema), login)
router.use(auth)
router.put('/update/:id', validate(userUpdateSchema), update)

export default router
