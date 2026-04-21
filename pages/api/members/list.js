import {getDB} from '../../../lib/db'
export default async function handler(req,res){
  const token = req.headers.authorization
  if(token !== process.env.ADMIN_PASSWORD) return res.status(401).json({error:'Unauthorized'})
  const db = await getDB()
  const members = db.get('members').value()
  return res.status(200).json({members})
}
