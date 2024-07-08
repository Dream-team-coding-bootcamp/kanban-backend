import { Router } from 'express'
import { ProjectsController } from '../controllers/projects.js'
import validate from '../middleware/validate.js'
import { createProjectSchema, updateProjectSchema } from '../schemas/projectSchema.js'
const router = Router()

router.get('/:user_id', ProjectsController.getProjects)
router.get('/:user_id/:project_id', ProjectsController.getProjectById)
router.post('/:user_id', validate(createProjectSchema), ProjectsController.createProject)
router.put('/:user_id/:project_id', validate(updateProjectSchema), ProjectsController.updateProject)
router.delete('/:user_id/:project_id', ProjectsController.deleteProject)

export default router
