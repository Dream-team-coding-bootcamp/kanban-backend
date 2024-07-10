import pool from '../pg.js'
export default class Projects {
  static async getProjects ({ user_id }) {
    const result = await pool.query(
      'SELECT * FROM projects WHERE user_id = $1 ORDER BY user_id ASC',
      [user_id]
    )
    return result.rows
  };

  static async getProjectById ({ user_id, project_id }) {
    const result = await pool.query(
      'SELECT * FROM projects WHERE user_id = $1 AND project_id = $2',
      [user_id, project_id]
    )
    return result.rows[0]
  };

  static async createProject ({ user_id, name, description }) {
    const result = await pool.query(
      'INSERT INTO projects (user_id, name, description) VALUES ($1, $2, $3) RETURNING *',
      [user_id, name, description]
    )
    return result.rows[0]
  };

  static async updateProject ({ name, description, user_id, project_id }) {
    const result = await pool.query(
      'update projects set name = $1, description = $2 where project_id in (SELECT pj.project_id FROM  projects pj JOIN users u ON u.user_id = pj.user_id where u.user_id = $3 and pj.project_id = $4) RETURNING *',
      [name, description, user_id, project_id]
    )
    return result.rows[0]
  };

  static async deleteProject ({ user_id, project_id }) {
    const { rowCount } = await pool.query(
      'delete from projects  where project_id in (SELECT pj.project_id FROM  projects pj JOIN users u ON u.user_id = pj.user_id where u.user_id = $1 and pj.project_id = $2)',
      [user_id, project_id]
    )
    return rowCount
  };
}
