import axios from 'axios'
export default async function handler(req,res){
  const {email, amount} = req.body
  if(!email || !amount) return res.status(400).json({error:'Missing'})
  const secret = process.env.PAYSTACK_SECRET
  if(!secret) return res.status(500).json({error:'PAYSTACK_SECRET not configured'})
  try{
    const response = await axios.post('https://api.paystack.co/transaction/initialize',{
      email, amount: Math.round(Number(amount) * 100)
    },{headers:{Authorization:`Bearer ${secret}`}})
    return res.status(200).json(response.data.data)
  }catch(e){
    console.error(e?.response?.data||e.message)
    return res.status(500).json({error:'Paystack init failed'})
  }
}
