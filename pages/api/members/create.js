import {getDB} from '../../../lib/db'
export default async function handler(req,res){
  if(req.method !== 'POST') return res.status(405).end()
  const {email, amount} = req.body
  if(!email || !amount) return res.status(400).json({error:'Missing'})
  const db = await getDB()
  const member = {id: Date.now().toString(), email, amount: Number(amount), created: new Date().toISOString(), lastNotified: null}
  db.get('members').push(member).write()
  return res.status(200).json({ok:true, member})
}
