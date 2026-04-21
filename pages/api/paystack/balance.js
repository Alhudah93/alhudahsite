import axios from 'axios'
import { getDB } from '../../../lib/db'
export default async function handler(req,res){
  const token = req.headers.authorization
  if(token !== process.env.ADMIN_PASSWORD) return res.status(401).json({error:'Unauthorized'})
  const secret = process.env.PAYSTACK_SECRET
  if(!secret) return res.status(500).json({error:'PAYSTACK_SECRET not set'})
  try{
    const response = await axios.get('https://api.paystack.co/balance',{headers:{Authorization:`Bearer ${secret}`}})
    return res.status(200).json(response.data)
  }catch(e){
    console.error(e?.response?.data||e.message)
    return res.status(500).json({error:'Failed to fetch balance'})
  }
}
