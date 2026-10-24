import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion, useScroll, useSpring } from 'framer-motion'
import { Phone, MessageCircle } from 'lucide-react'
import Sidebar from './Sidebar'
import './Header.css'

const PHONE_HREF = 'tel:+393518198457'
const BOOKING_HREF =
  'https://wa.me/393518198457?text=' +
  encodeURIComponent('Ciao, vorrei effettuare una breve consulenza conoscitiva per comprendere se potete essermi di aiuto. Quando ci sarebbe posto? Grazie')

// In cima: barra piena. Scorrendo: capsula di vetro sospesa, sempre visibile su desktop;
// su schermi stretti si nasconde quando scendi e torna quando risali.
// La linea verde segna quanto hai letto.
const Header = ({ topOffset = 0 }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [menuAnchor, setMenuAnchor] = useState(null)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const lastY = useRef(0)
  const menuBtnRef = useRef(null)
  const location = useLocation()
  const navigate = useNavigate()

  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 })

  useEffect(() => {
    const onScroll = () => {
      // Con il menu aperto il body è bloccato e scrollY vale 0: non toccare lo stato
      if (document.body.style.position === 'fixed') return

      const y = window.scrollY
      const delta = y - lastY.current
      lastY.current = y
      setScrolled(y > 12)
      // In cima e su desktop l'header è sempre visibile (anche dopo un salto, es. cambio pagina)
      if (y < 240 || window.matchMedia('(min-width: 1024px)').matches) {
        setHidden(false)
        return
      }
      // Salti grandi = scroll programmatico (es. ripristino alla chiusura del menu): non nascondere
      if (Math.abs(delta) > 400) return
      if (delta > 6) setHidden(true)
      else if (delta < -6) setHidden(false)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Altri elementi fissi (es. la colonna della home) possono adeguarsi
  useEffect(() => {
    document.documentElement.dataset.header = hidden ? 'hidden' : scrolled ? 'floating' : 'top'
  }, [hidden, scrolled])

  const openSidebar = () => {
    const r = menuBtnRef.current?.getBoundingClientRect()
    setMenuAnchor(r ? { x: r.left, y: r.top, w: r.width, h: r.height } : null)
    setIsSidebarOpen(true)
  }

  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }

  const handleLogoClick = (e) => {
    e.preventDefault()
    window.scrollTo(0, 0)

    if (location.pathname === '/') {
      window.location.href = '/'
    } else {
      navigate('/')
    }
  }

  return (
    <>
      <header
        className={`mx-header ${scrolled ? 'is-floating' : ''} ${hidden && !isSidebarOpen ? 'is-hidden' : ''}`}
        style={{ top: `${topOffset}px` }}
      >
        <div className="mx-header__bar">
          <button
            ref={menuBtnRef}
            type="button"
            onClick={openSidebar}
            className="mx-header__menu"
            aria-label="Apri menu"
            aria-expanded={isSidebarOpen}
          >
            <span className="mx-burger" aria-hidden="true">
              <i />
              <i />
            </span>
            <span className="mx-header__menu-label">Menu</span>
          </button>

          <a href="/" className="mx-header__logo" onClick={handleLogoClick} aria-label="Mobilitas, torna alla home">
            <img src="/logo_verde.png" alt="Mobilitas" decoding="async" />
          </a>

          <div className="mx-header__actions">
            <a href={PHONE_HREF} className="mx-header__call" aria-label="Chiama Mobilitas">
              <Phone size={18} strokeWidth={2} />
              <span>Chiama</span>
            </a>
            <a href={BOOKING_HREF} target="_blank" rel="noopener noreferrer" className="mx-header__book">
              <MessageCircle size={16} strokeWidth={2.4} />
              Prenota
            </a>
          </div>

          <motion.span className="mx-header__progress" style={{ scaleX: progress }} aria-hidden="true" />
        </div>
      </header>

      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} anchor={menuAnchor} />
    </>
  )
}

export default Header
