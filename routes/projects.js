import { Router } from "express";
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from "../models/projects";

const router = Router();

router.get("/:user_id/projects", getProjects);
router.get("/:user_id/projects/:project_id", getProjectById);
router.post("/:user_id/projects", createProject);
router.put("/:user_id/projects/:project_id", updateProject);
router.delete("/:user_id/projects/:project_id", deleteProject);

export default router;