import db from '../pg.js'

export default class Board {
  static async create({ title, project_id, user_id }) {
    // Check if the user has access to the project (you can add additional validation logic)
    const userHasAccess = await db.query(
      'SELECT 1 FROM projects WHERE project_id = $1 AND user_id = $2',
      [project_id, user_id]
    );
  
    if (!userHasAccess.rows.length) {
      throw new Error('User does not have access to this project.');
    }
  
    // Insert the board
    const result = await db.query(
      'INSERT INTO boards (title, project_id) VALUES ($1, $2) RETURNING board_id, title, project_id',
      [title, project_id]
    );
  
    return result.rows[0];
  }
  

  static async findByProjectId ({ user_id, project_id }) {
    const result = await db.query(
            `
        SELECT b.*
        FROM boards b
        JOIN projects pj ON b.project_id = pj.project_id
        WHERE pj.user_id = $1 AND pj.project_id = $2;
      `,
      [user_id, project_id]
    )
    return result.rows  
  }

  static async findById({ user_id, board_id }) {
    const result = await db.query(
      'SELECT board_id, title, project_id FROM boards b WHERE board_id IN (SELECT b.board_id FROM boards b JOIN projects pj ON pj.project_id = b.project_id JOIN users u ON u.user_id = pj.user_id WHERE u.user_id = $1 AND b.board_id = $2)',
      [user_id, board_id]
    );
    return result.rows[0];
  }
  

  

  static async updateTitle ({ boardId, title, user_id }) {
    const result = await db.query(
      'UPDATE boards SET title = $1 WHERE board_id IN (SELECT b.board_id FROM boards b JOIN projects pj ON pj.project_id = b.project_id JOIN users u ON u.user_id = pj.user_id WHERE u.user_id = $2 AND b.board_id = $3) RETURNING *',
      [title, user_id, boardId]
    )
    return result.rows[0]
  }

  static async delete ({ boardId, user_id }) {
    const { rowCount } = await db.query(
      'DELETE FROM boards WHERE board_id IN (SELECT b.board_id FROM boards b JOIN projects pj ON pj.project_id = b.project_id JOIN users u ON u.user_id = pj.user_id WHERE u.user_id = $1 AND b.board_id = $2) RETURNING *',
      [user_id, boardId]
    )
    return rowCount
  }
}
