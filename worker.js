require('dotenv').config()
const {getDB} = require('./lib/db')
const nodemailer = require('nodemailer')
async function sendEmail(to, subject, text){
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT || 587,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
  })
  await transporter.sendMail({from: process.env.EMAIL_FROM, to, subject, text})
}
async function run(){
  const db = await getDB()
  db.read()
  const members = db.data.members || []
  const now = new Date()
  for(const m of members){
    const last = m.lastNotified ? new Date(m.lastNotified) : null
    // notify if never notified or more than ~28 days passed
    if(!last || ((now - last) > 1000*60*60*24*28)){
      try{
        await sendEmail(m.email, 'Monthly pledge reminder', `Dear member, this is a reminder to pledge NGN ${m.amount} this month to Alhudah.`)
        m.lastNotified = new Date().toISOString()
        console.log('Notified',m.email)
      }catch(e){
        console.error('Send failed',e.message)
      }
    }
  }
  db.write()
}
run().then(()=>console.log('Worker finished')).catch(e=>console.error(e))
