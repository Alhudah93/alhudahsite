import {useState} from 'react'
import axios from 'axios'
export default function Donate(){
  const [email,setEmail]=useState('')
  const [amount,setAmount]=useState(50)
  const [loading,setLoading]=useState(false)
  async function start(){
    setLoading(true)
    try{
      const res = await axios.post('/api/paystack/init', {email, amount})
      const {authorization_url} = res.data
      if(authorization_url) window.location.href = authorization_url
    }catch(e){
      alert('Error starting payment')
    } finally{setLoading(false)}
  }
  return (
    <main style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'calc(100vh - 80px)',padding:'2rem'}}>
      <div style={{width:'100%',maxWidth:480}}>
        <h1 style={{textAlign:'center',marginBottom:32,color:'#0f172a'}}>Donate</h1>
        <div className="card" style={{boxShadow:'0 10px 30px rgba(0,0,0,0.1)'}}>
          <div className="form-row"><label style={{color:'#0f172a',fontWeight:600}}>Email</label><input value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" style={{padding:'10px 12px',border:'1px solid #e5e7eb',borderRadius:'8px',fontSize:14}}/></div>
          <div className="form-row"><label style={{color:'#0f172a',fontWeight:600}}>Amount (NGN)</label><input type="number" value={amount} onChange={e=>setAmount(e.target.value)} style={{padding:'10px 12px',border:'1px solid #e5e7eb',borderRadius:'8px',fontSize:14}}/></div>
          <button className="btn" onClick={start} disabled={loading} style={{width:'100%',marginTop:16}}>{loading? 'Processing...':'Donate'}</button>
          <p className="small" style={{textAlign:'center',color:'#6b7280',marginTop:16}}>You will be redirected to Paystack to complete the payment.</p>
        </div>
      </div>
    </main>
  )
}
