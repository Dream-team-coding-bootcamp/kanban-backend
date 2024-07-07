import pg from 'pg'

const pool = new pg.Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'stivencano123',
  port: 5432
})

export default pool
// Se hacen consultas a la base de datos con el objeto pool.query() , y es una promesa por lo tanto se usa await