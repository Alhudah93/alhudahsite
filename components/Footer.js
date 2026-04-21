export default function Footer(){
  return (
    <footer className="footer">
      <div className="container" style={{textAlign:'center',maxWidth:'100%'}}>
        <div style={{marginBottom:24}}>
          <strong style={{fontSize:20}}>ALHUDAH</strong>
          <div className="small" style={{color:'#d1fae5',marginTop:4}}>For Human Capital Development</div>
        </div>
        <div style={{display:'flex',justifyContent:'center',gap:24,marginBottom:24,flexWrap:'wrap'}}>
          <a href="#about">About</a>
          <a href="#programs">Programs</a>
          <a href="#donate">Donate</a>
          <a href="#contact">Contact</a>
        </div>
        <div style={{borderTop:'1px solid rgba(209, 250, 229, 0.3)',paddingTop:20}}>
          <div style={{fontSize:13,marginBottom:8}}>RC Number: 8601561</div>
          <div>© {new Date().getFullYear()} Alhudah Foundation. All rights reserved.</div>
        </div>
      </div>
    </footer>
  )
}
