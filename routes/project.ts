import { Router } from 'express'
import { ProjectsController } from '../controllers/projects.ts'
import validate from '../middleware/validate.ts'
import { createProjectSchema, updateProjectSchema } from '../schemas/projectSchema.ts'
const router = Router()

router.get('/', ProjectsController.getProjects)
router.get('/:project_id', ProjectsController.getProjectById)
router.post('/', validate(createProjectSchema), ProjectsController.createProject)
router.put('/:project_id', validate(updateProjectSchema), ProjectsController.updateProject)
router.delete('/:project_id', ProjectsController.deleteProject)

export default router
