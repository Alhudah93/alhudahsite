require('dotenv').config()
const mysql = require('mysql2/promise')
const nodemailer = require('nodemailer')

let pool

async function getDB(){
  if(pool) return pool
  pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'alhudah',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  })
  return pool
}

async function query(sql, values = []){
  const pool = await getDB()
  const [results] = await pool.execute(sql, values)
  return results
}
async function sendEmail(to, subject, text){
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT || 587,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
  })
  await transporter.sendMail({from: process.env.EMAIL_FROM, to, subject, text})
}
async function run(){
  const members = await query('SELECT * FROM members')
  const now = new Date()
  for(const m of members){
    const last = m.lastNotified ? new Date(m.lastNotified) : null
    // notify if never notified or more than ~28 days passed
    if(!last || ((now - last) > 1000*60*60*24*28)){
      try{
        await sendEmail(m.email, 'Monthly pledge reminder', `Dear member, this is a reminder to pledge NGN ${m.amount} this month to Alhudah.`)
        await query('UPDATE members SET lastNotified = ? WHERE id = ?', [new Date().toISOString(), m.id])
        console.log('Notified',m.email)
      }catch(e){
        console.error('Send failed',e.message)
      }
    }
  }
}
run().then(()=>console.log('Worker finished')).catch(e=>console.error(e))
