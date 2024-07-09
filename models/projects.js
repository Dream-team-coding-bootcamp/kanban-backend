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
      'UPDATE projects SET name = $1, description = $2 WHERE user_id = $3 AND project_id = $4 RETURNING *',
      [name, description, user_id, project_id]
    )
    return result.rows[0]
  };

  static async deleteProject ({ user_id, project_id }) {
    const { rowCount } = await pool.query(
      'DELETE FROM projects WHERE user_id = $1 AND project_id = $2',
      [user_id, project_id]
    )
    return rowCount
  };
}
