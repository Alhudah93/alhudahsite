import axios from 'axios'
export default async function handler(req,res){
  const {reference} = req.query
  const secret = process.env.PAYSTACK_SECRET
  if(!secret) return res.status(500).json({error:'PAYSTACK_SECRET not configured'})
  try{
    const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`,{headers:{Authorization:`Bearer ${secret}`}})
    return res.status(200).json(response.data)
  }catch(e){
    return res.status(500).json({error:'verify failed'})
  }
}
