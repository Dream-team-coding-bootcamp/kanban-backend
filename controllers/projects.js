import Projects from '../models/projects.js'

export class ProjectsController {
  static async getProjects (req, res) {
    try {
      const { user_id } = req.params
      const projects = await Projects.getProjects({ user_id })
      res.json(projects)
    } catch (error) {
      return res.status(404).json({ error: 'No projects found' })
    }
  };

  static async getProjectById (req, res) {
    const { user_id, project_id } = req.params
    const project = await Projects.getProjectById({ user_id, project_id })
    if (project) return res.json(project)
    res.status(404).json({ message: 'Project not found' })
  };

  static async createProject (req, res) {
    try {
      const { user_id } = req.params
      const { name, description } = req.body
      const result = await Projects.createProject({ user_id, name, description })
      res.status(201).json(result)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  };

  static async updateProject (req, res) {
    try {
      const { user_id, project_id } = req.params
      const { name, description } = req.body
      const result = await Projects.updateProject({ name, description, user_id, project_id })
      return res.json(result)
    } catch (error) {
      return res.status(404).json({ message: 'Project not found' })
    }
  };

  static async deleteProject (req, res) {
    const { user_id, project_id } = req.params
    const rowCount = await Projects.deleteProject({ user_id, project_id })

    if (rowCount === 0) {
      return res.status(404).json({ message: 'Project not found' })
    }

    return res.sendStatus(204)
  };
}
