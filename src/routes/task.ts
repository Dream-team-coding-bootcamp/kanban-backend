import { Router } from 'express'
import validate from '../middleware/validate.js'
import { createTaskSchema, updateTitleSchema, updateContentSchema, changeBoardSchema } from '../schemas/taskSchema.js'

import { create, updateTitle, updateContent, findByTaskId, deleteTask, changeBoard } from '../controllers/taskController.js'

const router = Router()

router.post('/create', validate(createTaskSchema), create)
router.put('/update/title/:taskId', validate(updateTitleSchema), updateTitle)
router.put('/update/content/:taskId', validate(updateContentSchema), updateContent)
router.get('/find/:taskId', findByTaskId)
router.put('/change-board/:taskId', validate(changeBoardSchema), changeBoard)
router.delete('/delete/:taskId', deleteTask)

export default router
