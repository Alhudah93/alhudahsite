import axios from 'axios'
export async function fetchBalance(secret){
  const res = await axios.get('https://api.paystack.co/balance',{headers:{Authorization:`Bearer ${secret}`}})
  return res.data
}
