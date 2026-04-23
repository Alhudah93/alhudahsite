import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function Header(){
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

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
        <button className="hamburger-menu" onClick={toggleMenu} aria-label="Toggle menu">
          <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
        </button>
        <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
          <Link href="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link href="#programs" className="nav-link" onClick={() => setIsMenuOpen(false)}>Programs</Link>
          <Link href="/donate" className="nav-link" onClick={() => setIsMenuOpen(false)}>Donation</Link>
          <Link href="/membership" className="nav-link" onClick={() => setIsMenuOpen(false)}>Membership Dashboard</Link>
        </nav>
      </div>
    </header>
  )
}
