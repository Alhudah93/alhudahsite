import {useState} from 'react'
import { useRouter } from 'next/router'
export default function Login(){
  const [pw,setPw]=useState('')
  const router = useRouter()
  async function submit(e){
    e.preventDefault()
    // set token in localStorage for simplicity
    const res = await fetch('/api/admin/login',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({password:pw})})
    const json = await res.json()
    if(json.ok){
      localStorage.setItem('admin_token',json.token)
      router.push('/admin')
    } else alert('Login failed')
  }
  return (
    <div className="container">
      <h1>Admin Login</h1>
      <form onSubmit={submit} style={{maxWidth:420}} className="card">
        <div className="form-row"><label>Password</label><input type="password" value={pw} onChange={e=>setPw(e.target.value)}/></div>
        <button className="btn">Sign in</button>
      </form>
    </div>
  )
}
