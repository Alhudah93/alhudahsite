import Link from 'next/link'
import Image from 'next/image'

export default function Header(){
  return (
    <header className="header">
      <div className="container" style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <Link href="/" className="logo-link" style={{display:'flex',alignItems:'center',gap:12}}>
            <Image src="/logo.png" alt="Alhudah" width={56} height={56} />
            <div style={{lineHeight:1.2}}>
              <div style={{fontWeight:700,fontSize:16}}>ALHUDAH</div>
              <div className="small" style={{fontSize:11,marginTop:2}}>Human Capital Development</div>
              <div className="small" style={{fontSize:10,marginTop:2,color:'#9ca3af'}}>RC: 8601561</div>
            </div>
          </Link>
        </div>
        <nav className="nav">
          <Link href="#programs" className="nav-link">Programs</Link>
          <Link href="/donate" className="nav-link">Donation</Link>
          <Link href="/membership" className="nav-link">Membership Dashboard</Link>
        </nav>
      </div>
    </header>
  )
}
