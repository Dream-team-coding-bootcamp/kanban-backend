import { Router } from 'express'
import { ProjectsController } from '../controllers/projects.js'

const router = Router()

router.get('/:user_id', ProjectsController.getProjects)
router.get('/:user_id/:project_id', ProjectsController.getProjectById)
router.post('/:user_id', ProjectsController.createProject)
router.put('/:user_id/:project_id', ProjectsController.updateProject)
router.delete('/:user_id/:project_id', ProjectsController.deleteProject)

export default router
