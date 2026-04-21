import {useState} from 'react'
import axios from 'axios'
export default function Membership(){
  const [email,setEmail]=useState('')
  const [amount,setAmount]=useState(1000)
  const [loading,setLoading]=useState(false)
  async function join(){
    setLoading(true)
    try{
      await axios.post('/api/members/create',{email,amount})
      alert('Thank you — your pledge is recorded. You will receive monthly notifications.')
    }catch(e){
      alert('Error creating membership')
    } finally{setLoading(false)}
  }
  return (
    <main style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'calc(100vh - 80px)',padding:'2rem'}}>
      <div style={{width:'100%',maxWidth:560}}>
        <h1 style={{textAlign:'center',marginBottom:32,color:'#0f172a'}}>Become a Member</h1>
        <p style={{textAlign:'center',color:'#475569',marginBottom:32,fontSize:15}}>Pledge a monthly contribution to support our mission</p>
        <div className="card" style={{boxShadow:'0 10px 30px rgba(0,0,0,0.1)'}}>
          <div className="form-row"><label style={{color:'#0f172a',fontWeight:600}}>Email</label><input value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" style={{padding:'10px 12px',border:'1px solid #e5e7eb',borderRadius:'8px',fontSize:14}}/></div>
          <div className="form-row"><label style={{color:'#0f172a',fontWeight:600}}>Monthly Pledge (NGN)</label><input type="number" value={amount} onChange={e=>setAmount(e.target.value)} style={{padding:'10px 12px',border:'1px solid #e5e7eb',borderRadius:'8px',fontSize:14}}/></div>
          <button className="btn" onClick={join} disabled={loading} style={{width:'100%',marginTop:16}}>{loading? 'Saving...':'Join as Member'}</button>
          <p className="small" style={{textAlign:'center',color:'#6b7280',marginTop:16}}>We will email you monthly reminders and payment instructions. For automated recurring billing, we can set up Paystack subscriptions upon request.</p>
        </div>
      </div>
    </main>
  )
}
