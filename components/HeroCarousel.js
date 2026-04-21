import { useRef } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

export default function HeroCarousel() {
  const slides = [
    {
      id: 1,
      title: 'Investing in Humanity',
      subtitle: 'Building a stronger, more compassionate community',
      desc: 'Through education, welfare support, and sustainable development programs, we empower individuals to reach their full potential and unlock their true potential.',
      bgColor: '#0f766e',
      bgGradient: 'linear-gradient(135deg, #0f766e 0%, #115e59 100%)',
      accentColor: '#d1fae5'
    },
    {
      id: 2,
      title: 'Empowering the Ummah',
      subtitle: 'Strengthening Islamic values and community bonds',
      desc: 'We foster unity, cooperation, and spiritual growth through religious education, social engagement, and meaningful collective action.',
      bgColor: '#059669',
      bgGradient: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
      accentColor: '#d1fae5'
    }
  ]

  const settings = {
    dots: true,
    infinite: true,
    speed: 900,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000,
    pauseOnHover: true,
    arrows: true,
    dotsClass: 'slick-dots',
    customPaging: () => <button className="carousel-dot-btn" />
  }

  return (
    <div className="hero-carousel-wrapper">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id} className="hero-slide">
            <div 
              className="hero-slide-content"
              style={{
                background: slide.bgGradient,
                backgroundAttachment: 'fixed'
              }}
            >
              <div className="hero-overlay" />
              <div className="hero-slide-text">
                <span className="hero-badge">Alhudah Foundation</span>
                <h1 className="hero-slide-title">{slide.title}</h1>
                <div className="hero-divider" />
                <h2 className="hero-slide-subtitle">{slide.subtitle}</h2>
                <p className="hero-slide-description">{slide.desc}</p>
                <div className="hero-cta">
                  <button className="btn btn-light">Explore Now</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  )
}
