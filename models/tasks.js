import db from '../pg.js'

export default class tasks {
  static async create ({ title, content, boardId }) {
    const result = await db.query('INSERT INTO tasks (title, content, board_id) VALUES ($1, $2, $3) RETURNING *', [title, content, boardId])
    return result.rows[0]
  }

  static async findByTaskId ({ taskId }) {
    const result = await db.query('SELECT * FROM tasks WHERE task_id = $1', [taskId])
    return result.rows
  }

  static async updateTitle ({ taskId, title }) {
    const result = await db.query('UPDATE tasks SET title = $1 WHERE task_id = $2 RETURNING *', [title, taskId])
    return result.rows[0]
  }

  static async delete ({ taskId }) {
    await db.query('DELETE FROM tasks WHERE task_id = $1', [taskId])
  }
}

// task_id,title,content,board_id
