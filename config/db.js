import pg from 'pg'

const pool = new pg.Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'nodepg',
  password: '1705',
  port: 5432
})



export default pool


