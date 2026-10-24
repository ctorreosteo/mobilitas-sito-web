import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, animate, motion, useMotionValue } from 'framer-motion'
import { X, Phone, Mail, MessageCircle, User, ArrowUpRight, Plus, MapPin, Clock } from 'lucide-react'
import { Vertebra } from './home-sections/SpineProgress'
import './Sidebar.css'

const PHONE_HREF = 'tel:+393518198457'
const EMAIL_HREF = 'mailto:studio@studiomobilitas.it'
const WHATSAPP_HREF =
  'https://wa.me/393518198457?text=' +
  encodeURIComponent('Ciao Mobilitas, vorrei avere maggiori informazioni.')

const EASE = [0.16, 1, 0.3, 1]
const SPINE = 20

const primaryItems = [
  { name: 'Scopri Mobilitas', href: '/', note: 'Lo studio osteopatico più scelto di Torino', image: '/home/web/home7-900.jpg' },
  { name: 'Testimonianze', href: '/testimonianze', note: 'Le storie di chi ha ripreso il controllo', image: '/home/web/home2-900.jpg' },
  { name: 'La nostra storia', href: '/la-nostra-storia', note: 'Da dove veniamo e dove stiamo andando', image: '/menu/storia.jpg' },
  { name: 'Fitness Club', href: '/mobilitas-fitness', note: 'Mobilitas Fitness Club', image: '/menu/fitness.jpg' },
  { name: 'Mobilitas Card', href: '/carta-fedelta', note: 'La carta fedeltà Mobilitas', image: '/menu/card.jpg' },
]

const partners = [
  { name: 'GPADEL', href: '/partnership/gpadel' },
  { name: 'Stampa Subalpina', href: '/partnership/stampa-subalpina' },
  { name: 'Robogest', href: '/partnership/robogest' },
  { name: 'Edenred', href: '/partnership/edenred' },
  { name: 'Allianz', href: '/partnership/allianz' },
]

const secondaryItems = [
  { name: 'Lavora con noi', href: '/lavora-con-noi' },
  { name: 'Influencer', href: '/influencer' },
  { name: 'Mobilitas Insider', href: '/newsletter' },
  { name: 'Domande frequenti', href: '/faq' },
  { name: 'Magazine', href: '/magazine' },
  { name: 'Blog', href: '/blog' },
  { name: 'Risorse', href: '/risorse' },
]

// Il menu si apre come un'onda che parte dal bottone ☰, ovunque si trovi in quel momento
const panelVariants = (cx, cy) => ({
  closed: { clipPath: `circle(0px at ${cx}px ${cy}px)`, transition: { duration: 0.6, ease: [0.7, 0, 0.84, 0] } },
  open: { clipPath: `circle(150vmax at ${cx}px ${cy}px)`, transition: { duration: 0.9, ease: EASE } },
})

// La ✕ prende il posto esatto delle due linee del ☰ (quadrato di 44px a sinistra del bottone).
// gridColumn auto: così il riferimento è la barra intera e non la cella della griglia.
const closeStyle = (anchor) =>
  anchor && { position: 'absolute', zIndex: 3, gridColumn: 'auto', left: anchor.x, top: anchor.y + (anchor.h - 44) / 2 }

const rise = (i) => ({
  initial: { y: '110%' },
  animate: { y: '0%', transition: { duration: 0.9, ease: EASE, delay: 0.25 + i * 0.06 } },
  exit: { y: '110%', transition: { duration: 0.3, ease: 'easeIn' } },
})

const fade = (delay) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE, delay } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
})

const MenuContent = ({ onClose, anchor }) => {
  const { pathname } = useLocation()
  const [preview, setPreview] = useState(
    Math.max(0, primaryItems.findIndex((item) => item.href === pathname))
  )
  const [partnersOpen, setPartnersOpen] = useState(pathname.startsWith('/partnership'))
  const closeRef = useRef(null)

  // La colonna sullo sfondo si raddrizza mentre il menu si apre
  const progress = useMotionValue(0)
  useEffect(() => {
    const controls = animate(progress, 1, { duration: 1.6, ease: EASE, delay: 0.3 })
    return () => controls.stop()
  }, [progress])

  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true })
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const go = () => {
    window.scrollTo(0, 0)
    onClose()
  }

  const isActive = (href) => (href === '/' ? pathname === '/' : pathname.startsWith(href))

  return (
    <motion.div
      className="mx-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      variants={panelVariants(anchor ? anchor.x + 22 : 34, anchor ? anchor.y + anchor.h / 2 : 40)}
      initial="closed"
      animate="open"
      exit="closed"
    >
      <div className="mx-menu__aurora" aria-hidden="true" />

      <div className="mx-menu__spine" aria-hidden="true">
        {Array.from({ length: SPINE }, (_, i) => (
          <Vertebra key={i} i={i} count={SPINE} progress={progress} vertical amp={1.3} size={1.4} />
        ))}
      </div>

      {/* Stessa geometria dell'header: il ☰ diventa ✕ nello stesso punto */}
      <div className="mx-menu__bar">
        <button
          ref={closeRef}
          type="button"
          className="mx-menu__close"
          onClick={onClose}
          aria-label="Chiudi menu"
          style={closeStyle(anchor)}
        >
          <X size={24} strokeWidth={2} />
        </button>
        <Link to="/" className="mx-menu__logo" onClick={go}>
          <img src="/logo_verde.png" alt="Mobilitas" />
        </Link>
        <a href={PHONE_HREF} className="mx-menu__call" aria-label="Chiama Mobilitas">
          <Phone size={18} strokeWidth={2} />
          <span>Chiama</span>
        </a>
      </div>

      <div className="mx-menu__scroll">
        <div className="mx-menu__grid">
          <nav className="mx-menu__main" aria-label="Navigazione principale">
            <motion.p className="mx-menu__eyebrow" {...fade(0.2)}>
              Menu
            </motion.p>

            <ul className="mx-menu__primary">
              {primaryItems.map((item, i) => (
                <li key={item.href} onMouseEnter={() => setPreview(i)}>
                  <span className="mx-menu__mask">
                    <motion.span {...rise(i)} style={{ display: 'block' }}>
                      <Link
                        to={item.href}
                        onClick={go}
                        onFocus={() => setPreview(i)}
                        className={`mx-menu__link ${isActive(item.href) ? 'is-current' : ''}`}
                        aria-current={isActive(item.href) ? 'page' : undefined}
                      >
                        <small>0{i + 1}</small>
                        <span className="mx-menu__label" data-text={item.name}>
                          {item.name}
                        </span>
                        <ArrowUpRight className="mx-menu__arrow" size={28} strokeWidth={2.4} />
                      </Link>
                    </motion.span>
                  </span>
                </li>
              ))}

              <li>
                <span className="mx-menu__mask">
                  <motion.span {...rise(primaryItems.length)} style={{ display: 'block' }}>
                    <button
                      type="button"
                      className={`mx-menu__link mx-menu__link--toggle ${partnersOpen ? 'is-open' : ''}`}
                      onClick={() => setPartnersOpen((open) => !open)}
                      aria-expanded={partnersOpen}
                    >
                      <small>0{primaryItems.length + 1}</small>
                      <span className="mx-menu__label" data-text="Partnership">
                        Partnership
                      </span>
                      <Plus className="mx-menu__plus" size={28} strokeWidth={2.4} />
                    </button>
                  </motion.span>
                </span>
                <AnimatePresence initial={false}>
                  {partnersOpen && (
                    <motion.div
                      className="mx-menu__partners"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: EASE }}
                    >
                      <div className="mx-menu__chips">
                        {partners.map((p) => (
                          <Link
                            key={p.href}
                            to={p.href}
                            onClick={go}
                            className={`mx-menu__chip ${isActive(p.href) ? 'is-current' : ''}`}
                          >
                            {p.name}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            </ul>

            <motion.ul className="mx-menu__secondary" {...fade(0.55)}>
              {secondaryItems.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    onClick={go}
                    className={isActive(item.href) ? 'is-current' : undefined}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </motion.ul>
          </nav>

          <aside className="mx-menu__side">
            <motion.div className="mx-menu__preview" {...fade(0.35)} aria-hidden="true">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.img
                  key={primaryItems[preview].image}
                  src={primaryItems[preview].image}
                  alt=""
                  initial={{ opacity: 0, scale: 1.12 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: EASE }}
                />
              </AnimatePresence>
              <div className="mx-menu__caption">
                <span>0{preview + 1}</span>
                {primaryItems[preview].note}
              </div>
            </motion.div>

            <motion.div className="mx-menu__contact" {...fade(0.5)}>
              <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className="mx-menu__cta" onClick={onClose}>
                <span>
                  <small>Il modo più veloce</small>
                  Scrivici su WhatsApp
                </span>
                <span className="mx-menu__cta-icon">
                  <MessageCircle size={20} strokeWidth={2.4} />
                </span>
              </a>
              <div className="mx-menu__quick">
                <a href={PHONE_HREF} onClick={onClose}>
                  <Phone size={17} strokeWidth={2.2} />
                  Chiama
                </a>
                <a href={EMAIL_HREF} onClick={onClose}>
                  <Mail size={17} strokeWidth={2.2} />
                  Email
                </a>
                <Link to="/login" onClick={go}>
                  <User size={17} strokeWidth={2.2} />
                  Accedi
                </Link>
              </div>
              <div className="mx-menu__info">
                <p>
                  <MapPin size={15} />
                  Via Peyron 54, Torino · comodo con la metro
                </p>
                <p>
                  <Clock size={15} />
                  Lun-Ven 8:00-21:00 · Sab 9:00-18:00
                </p>
              </div>
            </motion.div>
          </aside>
        </div>
      </div>
    </motion.div>
  )
}

const Sidebar = ({ isOpen, onClose, anchor = null }) => {
  // Blocca lo scroll della pagina sotto il menu
  useEffect(() => {
    if (!isOpen) return

    const scrollY = window.scrollY
    const { body, documentElement } = document
    const prevBodyOverflow = body.style.overflow
    const prevBodyPosition = body.style.position
    const prevBodyTop = body.style.top
    const prevBodyWidth = body.style.width
    const prevHtmlOverflow = documentElement.style.overflow

    body.style.overflow = 'hidden'
    body.style.position = 'fixed'
    body.style.top = `-${scrollY}px`
    body.style.width = '100%'
    documentElement.style.overflow = 'hidden'

    return () => {
      body.style.overflow = prevBodyOverflow
      body.style.position = prevBodyPosition
      body.style.top = prevBodyTop
      body.style.width = prevBodyWidth
      documentElement.style.overflow = prevHtmlOverflow
      // Istantaneo: con lo scroll-behavior smooth globale la pagina scorrerebbe visibilmente
      window.scrollTo({ top: scrollY, behavior: 'instant' })
    }
  }, [isOpen])

  return <AnimatePresence>{isOpen && <MenuContent key="menu" onClose={onClose} anchor={anchor} />}</AnimatePresence>
}

export default Sidebar
