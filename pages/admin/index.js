import {useEffect, useState} from 'react'
import Link from 'next/link'
export default function Admin(){
  const [members,setMembers]=useState([])
  const [balance,setBalance]=useState(null)
  useEffect(()=>{
    async function load(){
      const token = localStorage.getItem('admin_token')
      const res1 = await fetch('/api/members/list',{headers:{Authorization: token}})
      if(res1.status===401) return
      const j1 = await res1.json()
      setMembers(j1.members||[])
      const res2 = await fetch('/api/paystack/balance',{headers:{Authorization: token}})
      const j2 = await res2.json()
      setBalance(j2)
    }
    load()
  },[])
  return (
    <div className="container">
      <h1>Admin Dashboard</h1>
      <div style={{display:'flex',gap:12}}>
        <div style={{flex:1}} className="card">
          <h3>Members ({members.length})</h3>
          <ul>
            {members.map((m,i)=>(<li key={i}>{m.email} — NGN {m.amount} — joined {new Date(m.created).toLocaleString()}</li>))}
          </ul>
        </div>
        <div style={{width:320}} className="card">
          <h3>Paystack Balance</h3>
          <pre style={{whiteSpace:'pre-wrap'}}>{JSON.stringify(balance,null,2)}</pre>
        </div>
      </div>
      <div style={{marginTop:12}}>
        <Link href="/admin/login"><button className="btn secondary">Logout / Re-login</button></Link>
      </div>
    </div>
  )
}
