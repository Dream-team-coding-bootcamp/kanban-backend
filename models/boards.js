import db from '../pg.js'

export default class Board {
  static async create ({ title, project_id }) {
    const result = await db.query(
      'INSERT INTO boards (title, project_id) VALUES ($1, $2) RETURNING *',
      [title, project_id]
    )
    return result.rows[0]
  }

  static async findByProjectId ({ project_id }) {
    const result = await db.query(
      'SELECT * FROM boards WHERE project_id = $1',
      [project_id]
    )
    return result.rows
  }

  static async findById ({ boardId }) {
    const result = await db.query(
      'SELECT * FROM boards WHERE board_id = $1',
      [boardId]
    )
    return result.rows[0]
  }

  static async updateTitle ({ boardId, title, user_id }) {
    const result = await db.query(
      'UPDATE boards SET title = $1 WHERE board_id IN (SELECT b.board_id FROM boards b JOIN projects pj ON pj.project_id = b.project_id JOIN users u ON u.user_id = pj.user_id WHERE u.user_id = $2 AND b.board_id = $3) RETURNING *',
      [title, user_id, boardId]
    )
    return result.rows[0]
  }

  static async delete ({ boardId }) {
    const { rowCount } = await db.query(
      'DELETE FROM boards WHERE board_id = $1',
      [boardId]
    )
    return rowCount
  }
}
