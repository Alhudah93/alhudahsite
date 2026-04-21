import {query} from '../../../lib/db'
export default async function handler(req,res){
  if(req.method !== 'POST') return res.status(405).end()
  const {email, amount} = req.body
  if(!email || !amount) return res.status(400).json({error:'Missing'})
  try{
    const id = Date.now().toString()
    const created = new Date().toISOString()
    await query(
      'INSERT INTO members (id, email, amount, created, lastNotified) VALUES (?, ?, ?, ?, NULL)',
      [id, email, Number(amount), created]
    )
    const member = {id, email, amount: Number(amount), created, lastNotified: null}
    return res.status(200).json({ok:true, member})
  }catch(e){
    console.error('Create member error:', e.message)
    return res.status(500).json({error: e.message})
  }
}
