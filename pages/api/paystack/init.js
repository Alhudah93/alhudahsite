import axios from 'axios'
export default async function handler(req,res){
  const {email, amount} = req.body
  if(!amount) return res.status(400).json({error:'Amount is required'})
  const donorEmail = email || 'donor@alhudah.org'
  const secret = process.env.PAYSTACK_SECRET
  if(!secret) return res.status(500).json({error:'PAYSTACK_SECRET not configured'})
  try{
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || `${req.headers['x-forwarded-proto'] || 'http'}://${req.headers['x-forwarded-host'] || req.headers.host}`
    const response = await axios.post('https://api.paystack.co/transaction/initialize',{
      email: donorEmail, 
      amount: Math.round(Number(amount) * 100),
      callback_url: `${baseUrl}/donate`
    },{headers:{Authorization:`Bearer ${secret}`}})
    return res.status(200).json(response.data.data)
  }catch(e){
    const errorMsg = e?.response?.data?.message || e?.response?.data || e.message
    console.error('Paystack error:', errorMsg)
    return res.status(500).json({error: errorMsg || 'Paystack init failed', details: e?.response?.data})
  }
}
