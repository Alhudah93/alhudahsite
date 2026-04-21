import {useState, useEffect} from 'react'
import {useRouter} from 'next/router'
import axios from 'axios'
export default function Donate(){
  const router = useRouter()
  const [email,setEmail]=useState('')
  const [amount,setAmount]=useState(50)
  const [loading,setLoading]=useState(false)
  const [verified, setVerified]=useState(false)
  
  useEffect(() => {
    const {reference} = router.query
    if(reference){
      verifyPayment(reference)
    }
  }, [router.query])
  
  async function verifyPayment(reference){
    try{
      const res = await axios.get(`/api/paystack/verify?reference=${reference}`)
      if(res.data.data.status === 'success'){
        setVerified(true)
        setTimeout(() => {
          router.push('/')
        }, 2000)
      }
    }catch(e){
      console.error('Verification failed:', e.message)
      setTimeout(() => {
        router.push('/')
      }, 3000)
    }
  }
  async function start(){
    setLoading(true)
    try{
      const res = await axios.post('/api/paystack/init', {email, amount})
      const {authorization_url} = res.data
      if(authorization_url) window.location.href = authorization_url
    }catch(e){
      const errMsg = e?.response?.data?.error || e?.message || 'Error starting payment'
      console.error('Donation error:', errMsg, e?.response?.data)
      alert(errMsg)
    } finally{setLoading(false)}
  }
  if(verified){
    return (
      <main style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'calc(100vh - 80px)',padding:'2rem'}}>
        <div style={{width:'100%',maxWidth:480,textAlign:'center'}}>
          <h1 style={{color:'#059669',marginBottom:16}}>✓ Payment Successful!</h1>
          <p style={{color:'#6b7280',marginBottom:16}}>Thank you for your donation. Redirecting to homepage...</p>
        </div>
      </main>
    )
  }
  
  return (
    <main style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'calc(100vh - 80px)',padding:'2rem'}}>
      <div style={{width:'100%',maxWidth:480}}>
        <h1 style={{textAlign:'center',marginBottom:32,color:'#0f172a'}}>Donate</h1>
        <div className="card" style={{boxShadow:'0 10px 30px rgba(0,0,0,0.1)'}}>
          <div className="form-row"><label style={{color:'#0f172a',fontWeight:600}}>Email <span style={{fontWeight:400,fontSize:12,color:'#6b7280'}}>(Optional)</span></label><input value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" style={{padding:'10px 12px',border:'1px solid #e5e7eb',borderRadius:'8px',fontSize:14}}/></div>
          <div className="form-row"><label style={{color:'#0f172a',fontWeight:600}}>Amount (NGN)</label><input type="number" value={amount} onChange={e=>setAmount(e.target.value)} style={{padding:'10px 12px',border:'1px solid #e5e7eb',borderRadius:'8px',fontSize:14}}/></div>
          <button className="btn" onClick={start} disabled={loading} style={{width:'100%',marginTop:16}}>{loading? 'Processing...':'Donate'}</button>
          <p className="small" style={{textAlign:'center',color:'#6b7280',marginTop:16}}>You will be redirected to Paystack to complete the payment.</p>
        </div>
      </div>
    </main>
  )
}
