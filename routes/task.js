import { Router } from 'express'

import { create, updateTitle, updateContent, findByTaskId, deleteTask } from '../controllers/taskController.js'

const router = Router()

router.post('/create', create)
router.put('/update/title/:taskId', updateTitle)
router.put('/update/content/:taskId', updateContent)
router.get('/find/:taskId', findByTaskId)
router.delete('/delete/:taskId', deleteTask)

export default router
