import {query} from '../../../lib/db'
export default async function handler(req,res){
  const token = req.headers.authorization
  if(token !== process.env.ADMIN_PASSWORD) return res.status(401).json({error:'Unauthorized'})
  try{
    const members = await query('SELECT * FROM members ORDER BY created DESC')
    return res.status(200).json({members})
  }catch(e){
    console.error('List members error:', e.message)
    return res.status(500).json({error: e.message})
  }
}
