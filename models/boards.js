import db from '../pg.js'

export default class Board {
  static async create ({ title, projectId }) {
    const result = await db.query(
      'INSERT INTO boards (title, project_id) VALUES ($1, $2) RETURNING *',
      [title, projectId]
    )
    return result.rows[0]
  }

  static async findByProjectId ({ projectId }) {
    const result = await db.query(
      'SELECT * FROM boards WHERE project_id = $1',
      [projectId]
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

  static async updateTitle ({ boardId, title }) {
    const result = await db.query(
      'UPDATE boards SET title = $1 WHERE board_id = $2 RETURNING *',
      [title, boardId]
    )
    return result.rows[0]
  }

  static async delete ({ boardId }) {
    await db.query(
      'DELETE FROM boards WHERE board_id = $1',
      [boardId]
    )
  }
}
