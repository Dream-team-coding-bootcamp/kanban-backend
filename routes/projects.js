import { Router } from "express";
import { ProjectsController } from "../controllers/projects";

const router = Router();

router.get("/:user_id/projects", ProjectsController.getProjects);
router.get("/:user_id/projects/:project_id", ProjectsController.getProjectById);
router.post("/:user_id/projects", ProjectsController.createProject);
router.put("/:user_id/projects/:project_id", ProjectsController.updateProject);
router.delete("/:user_id/projects/:project_id", ProjectsController.deleteProject);

export default router;