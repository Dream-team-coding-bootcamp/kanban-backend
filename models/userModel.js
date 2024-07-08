import pool from '../config/db.js'

// metodos NO funcion
class User {
  static async create ({ username, email, hashedPassword }) {
    const result = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
      [username, email, hashedPassword]
    )
    return result.rows[0]
  }

  static async getByEmail ({ email }) {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email])
    return result.rows[0]
  }

  static async getById ({ id }) {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id])
    return result.rows[0]
  }

  static async updateName ({ id, name }) {
    const result = await pool.query('UPDATE users SET name = $1 WHERE user_id = $2 RETURNING *', [name, id])
    return result.rows[0]
  };
}

export default User
