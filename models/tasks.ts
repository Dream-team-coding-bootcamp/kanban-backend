import db from '../pg.ts'

export default class tasks {
  static async create ({ title, content, board_id, userId }) {
    const result = await db.query(
      'INSERT INTO tasks (title, content, board_id) ' +
      'SELECT $1, $2, $3 ' +
      'WHERE EXISTS (SELECT 1 FROM boards b ' +
      '              JOIN projects p ON b.project_id = p.project_id ' +
      '              WHERE b.board_id = $3 AND p.user_id = $4) ' +
      'RETURNING *',
      [title, content, board_id, userId]
    )
    return result.rows[0]
  }

  static async findByTaskId ({ taskId, userId }) {
    const result = await db.query(
      'SELECT * FROM tasks WHERE task_id = $1 AND board_id IN (SELECT board_id FROM boards WHERE project_id IN (SELECT project_id FROM projects WHERE user_id = $2))',
      [taskId, userId]
    )
    return result.rows[0]
  }

  static async updateTitle ({ taskId, title, userId }) {
    const result = await db.query(
      'UPDATE tasks SET title = $1 WHERE task_id = $2 AND board_id IN (SELECT board_id FROM boards WHERE project_id IN (SELECT project_id FROM projects WHERE user_id = $3)) RETURNING *',
      [title, taskId, userId]
    )
    return result.rows[0]
  }

  static async updateContent ({ taskId, content, userId }) {
    const result = await db.query(
      'UPDATE tasks SET content = $1 WHERE task_id = $2 AND board_id IN (SELECT board_id FROM boards WHERE project_id IN (SELECT project_id FROM projects WHERE user_id = $3)) RETURNING *',
      [content, taskId, userId]
    )
    return result.rows[0]
  }

  static async delete ({ taskId, userId }) {
    // Check if the task belongs to a board accessible by the user
    const userHasAccess = await db.query(
      'SELECT 1 FROM tasks t JOIN boards b ON t.board_id = b.board_id JOIN projects p ON b.project_id = p.project_id WHERE t.task_id = $1 AND p.user_id = $2',
      [taskId, userId]
    )
  
    if (!userHasAccess.rows.length) {
      throw new Error('User does not have access to this task or board.')
    }

    // Delete the task
    await db.query(
      'DELETE FROM tasks WHERE task_id = $1',
      [taskId]
    )
  }

  static async changeBoardId ({ taskId, boardId, userId }) {
    // Check if the board belongs to the specified user
    const userHasAccess = await db.query(
      'SELECT 1 FROM boards b JOIN projects pj ON b.project_id = pj.project_id WHERE pj.user_id = $1 AND b.board_id = $2',
      [userId, boardId]
    )
  
    if (!userHasAccess.rows.length) {
      throw new Error('User does not have access to this board.')
    }

    // Update the board ID for the specified task
    await db.query(
      'UPDATE tasks SET board_id = $1 WHERE task_id = $2',
      [boardId, taskId]
    )
  }
}

// task_id,title,content,board_id
