import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL
})

// Test para probar conexion
pool.query('SELECT NOW()').then(result => {
  console.log(result)
})

// Test para probar conexion
const checkConnection = async () => {
  try {
    await pool.query('SELECT NOW()')
    console.log('Database connection successful')
  } catch (err) {
    console.error('Database connection failed', err)
  }
}

checkConnection()

export default pool
// Se hacen consultas a la base de datos con el objeto pool.query() , y es una promesa por lo tanto se usa await