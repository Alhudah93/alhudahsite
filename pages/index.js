import Link from 'next/link'
import HeroCarousel from '../components/HeroCarousel'

export default function Home(){
  const trustees = [
    { name: 'Habib Mutolib Oladimeji', role: 'Trustee/Chairman', avatar: 'HO' },
    { name: 'Ganiyu Ismaila Gbadegesin', role: 'Trustee/Secretary', avatar: 'GG' },
    { name: 'Olagunju Sikiru Abiola', role: 'Trustee', avatar: 'OS' },
    { name: 'Muideen Ibrohim', role: 'Trustee', avatar: 'MI' },
    { name: 'Adam Ahmad', role: 'Trustee', avatar: 'AA' }
  ]
  const objectives = [
    { title: 'Welfare Support', desc: 'Assist the needy, vulnerable, and less privileged through charitable initiatives and welfare support.', icon: '🤝' },
    { title: 'Economic Empowerment', desc: 'Provide programs enhancing economic capacity through skills, vocational training, and financial support.', icon: '💼' },
    { title: 'Unity & Engagement', desc: 'Foster unity among members of the Muslim Ummah through religious, educational, and social engagement.', icon: '🌍' },
    { title: 'Humanitarian Outreach', desc: 'Feed the poor, especially during hardship, religious festivities, and emergencies.', icon: '🤲' }
  ]
  const projects = [
    { title: 'Zakat & Sadaqah Management', desc: 'Collect, manage, and disburse Zakat in strict accordance with Shari\'ah principles.', icon: '💰' },
    { title: 'Vocational Training Centers', desc: 'Empowerment programs focused on practical skills to build self-reliance and economic stability.', icon: '🎓' },
    { title: 'Emergency Feeding Initiatives', desc: 'Targeted outreach to provide food and relief during times of hardship and religious celebrations.', icon: '🍲' }
  ]

  return (
    <main>
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* About Section */}
      <section style={{padding:'4rem 2rem',backgroundColor:'white',margin:0}}>
        <div className="container" style={{textAlign:'center',maxWidth:800}}>
          <h2 style={{fontSize:36,fontWeight:800,color:'#0f172a',marginBottom:20}}>About Alhudah Foundation</h2>
          <p style={{fontSize:16,color:'#475569',marginBottom:20,lineHeight:1.8}}>The Alhudah Foundation for Human Capital Development is a forward-thinking, legally registered organization committed to creating sustainable positive impact within communities. We partner with vulnerable and underserved populations to provide holistic support encompassing education, economic empowerment, and humanitarian assistance.</p>
          <p style={{fontSize:15,color:'#6b7280',marginBottom:0,lineHeight:1.7,fontStyle:'italic'}}>Registered under Part "F" of the Companies and Allied Matters Act 2020 (RC: 8601561)</p>
        </div>
      </section>

      {/* Objectives Section */}
      <section className="objectives-section">
        <div className="container">
          <h2 style={{textAlign:'center',marginBottom:40,color:'white'}}>Our Mission & Vision</h2>
          <div className="objectives-grid">
            {objectives.map((obj,i)=>(
              <div key={i} className="objective-card">
                <div style={{fontSize:40,marginBottom:12}}>{obj.icon}</div>
                <h3>{obj.title}</h3>
                <p className="small" style={{color:'#e5e7eb'}}>{obj.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="leadership-section">
        <div className="container">
          <h2 style={{textAlign:'center',marginBottom:40,color:'#0f172a'}}>Our Leadership Board</h2>
          <p style={{textAlign:'center',color:'#475569',marginBottom:30}}>The Foundation is guided by its dedicated Board of Trustees</p>
          <div className="trustees-grid">
            {trustees.map((t,i)=>(
              <div key={i} className="trustee-card">
                <div className="trustee-avatar">{t.avatar}</div>
                <h4 style={{margin:0,color:'#0f172a'}}>{t.name}</h4>
                <p className="small" style={{margin:'8px 0 0 0',color:'#475569'}}>{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="projects-section">
        <div className="container">
          <h2 style={{textAlign:'center',marginBottom:40,color:'white'}}>Our Core Programs</h2>
          <div className="projects-grid">
            {projects.map((proj,i)=>(
              <div key={i} className="project-card">
                <div className="project-icon">{proj.icon}</div>
                <h3>{proj.title}</h3>
                <p className="small" style={{color:'#e5e7eb'}}>{proj.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation CTA Section */}
      <section className="donation-cta-section">
        <div className="container" style={{textAlign:'center'}}>
          <h2 style={{marginBottom:16,color:'#0f172a'}}>Fulfill Your Obligation. Impact a Life.</h2>
          <p style={{fontSize:16,color:'#475569',marginBottom:30,maxWidth:600,marginLeft:'auto',marginRight:'auto'}}>Your contributions drive our mission to support the less privileged and enhance human capital.</p>
          <div style={{display:'flex',gap:24,justifyContent:'center',flexWrap:'wrap',marginBottom:30}}>
            <div className="donation-channel">
              <h4>Zakat & Islamic Contributions</h4>
              <p className="small">Dedicated channels for Shari\'ah-compliant charitable giving.</p>
            </div>
            <div className="donation-channel">
              <h4>General Welfare Fund</h4>
              <p className="small">Support our vocational training and humanitarian outreach programs.</p>
            </div>
          </div>
          <Link href="/donate"><button className="btn" style={{fontSize:16,padding:'12px 32px'}}>Donate Now</button></Link>
        </div>
      </section>
    </main>
  )
}
