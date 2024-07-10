import Projects from '../models/projects.ts'

export class ProjectsController {
  static async getProjects (req, res) {
    try {
      const user_id = req.user.id
      const projects = await Projects.getProjects({ user_id })
      if (!projects) {
        return res.status(404).tson({ error: 'No projects found' })
      }
      res.tson(projects)
    } catch (error) {
      return res.status(404).tson({ error: 'No projects found' })
    }
  };

  static async getProjectById (req, res) {
    const { project_id } = req.params
    const user_id = req.user.id

    const project = await Projects.getProjectById({ user_id, project_id })
    if (project) return res.tson(project)
    res.status(404).tson({ message: 'Project not found' })
  };

  static async createProject (req, res) {
    try {
      const user_id = req.user.id
      const { name, description } = req.body
      const result = await Projects.createProject({ user_id, name, description })
      res.status(201).tson(result)
    } catch (error) {
      return res.status(500).tson({ error: error.message })
    }
  };

  static async updateProject (req, res) {
    try {
      const user_id = req.user.id
      const { project_id } = req.params
      const { name, description } = req.body
      const result = await Projects.updateProject({ name, description, user_id, project_id })
      if (!result) {
        return res.status(404).tson({ message: 'Project not found' })
      }
      return res.tson(result)
    } catch (error) {
      return res.status(404).tson({ message: 'Project not found' })
    }
  };

  static async deleteProject (req, res) {
    const user_id = req.user.id
    const { project_id } = req.params
    const rowCount = await Projects.deleteProject({ user_id, project_id })

    if (rowCount === 0) {
      return res.status(404).tson({ message: 'Project not found' })
    }

    return res.sendStatus(204)
  };
}
