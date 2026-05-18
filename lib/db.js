import mysql from 'mysql2/promise'

let pool

function getDbHost() {
  const rawHost = (process.env.DB_HOST || '127.0.0.1').trim()
  if (rawHost === 'localhost' || rawHost === '::1') return '127.0.0.1'
  return rawHost
}

export async function getDB(){
  if(pool) return pool
  pool = mysql.createPool({
    host: getDbHost(),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'alhudah',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  })
  return pool
}

export async function query(sql, values = []){
  const pool = await getDB()
  const [results] = await pool.execute(sql, values)
  return results
}
