import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, ArrowUp, MapPin, Clock, Phone, Mail, MessageCircle, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react'
import './Footer.css'

const EASE = [0.16, 1, 0.3, 1]
const PHONE_HREF = 'tel:+393518198457'
const EMAIL = 'studio@studiomobilitas.it'
const MAPS_HREF = 'https://www.google.com/maps/search/?api=1&query=Via+Peyron+54+Torino'
const BOOKING_HREF =
  'https://wa.me/393518198457?text=' +
  encodeURIComponent('Ciao, vorrei effettuare una breve consulenza conoscitiva per comprendere se potete essermi di aiuto. Quando ci sarebbe posto? Grazie')

const TikTokIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.59 2.59 0 0 1-2.59-2.59 2.59 2.59 0 0 1 3.36-2.47V9.68a5.68 5.68 0 0 0-.77-.05A5.69 5.69 0 0 0 4.17 15.3 5.69 5.69 0 0 0 9.86 21a5.69 5.69 0 0 0 5.69-5.69V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3a4.28 4.28 0 0 1-3.25-1.48z" />
  </svg>
)

// Profili ufficiali (gli stessi della pagina /links)
const socials = [
  { name: 'Instagram', href: 'https://www.instagram.com/studio_mobilitas', Icon: Instagram },
  { name: 'YouTube', href: 'https://www.youtube.com/@Studio_Mobilitas', Icon: Youtube },
  { name: 'TikTok', href: 'https://www.tiktok.com/@studio_mobilitas', Icon: TikTokIcon },
  { name: 'Facebook', href: 'https://www.facebook.com/studiomobilitas', Icon: Facebook },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/company/studio-mobilitas/', Icon: Linkedin },
]

const explore = [
  { name: 'Scopri Mobilitas', href: '/' },
  { name: 'Testimonianze', href: '/testimonianze' },
  { name: 'La nostra storia', href: '/la-nostra-storia' },
  { name: 'Fitness Club', href: '/mobilitas-fitness' },
  { name: 'Mobilitas Card', href: '/carta-fedelta' },
  { name: 'Lavora con noi', href: '/lavora-con-noi' },
  { name: 'Domande frequenti', href: '/faq' },
  { name: 'Blog', href: '/blog' },
]

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '0px 0px -10% 0px' },
  transition: { duration: 0.9, ease: EASE, delay },
})

export default function Footer() {
  const year = new Date().getFullYear()

  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="mx-footer">
      {/* La colonna, finalmente allineata */}
      <div className="mx-footer__spine" aria-hidden="true">
        {Array.from({ length: 32 }, (_, i) => (
          <span key={i} style={{ animationDelay: `${i * 40}ms` }} />
        ))}
      </div>

      <div className="mx-footer__wrap">
        <motion.div className="mx-footer__cta" {...reveal()}>
          <p className="mx-footer__kicker">Il primo passo</p>
          <a href={BOOKING_HREF} target="_blank" rel="noopener noreferrer" className="mx-footer__big">
            <span className="mx-footer__big-text" data-text="Prenota un consulto gratuito">
              Prenota un consulto gratuito
            </span>
            <span className="mx-footer__big-icon">
              <ArrowUpRight strokeWidth={2.4} />
            </span>
          </a>
          <div className="mx-footer__direct">
            <a href={PHONE_HREF}>
              <Phone size={18} />
              +39 351 819 8457
            </a>
            <a href={`mailto:${EMAIL}`}>
              <Mail size={18} />
              {EMAIL}
            </a>
          </div>
        </motion.div>

        <div className="mx-footer__cols">
          <motion.div className="mx-footer__col" {...reveal(0.05)}>
            <p className="mx-footer__title">Lo studio</p>
            <p className="mx-footer__text">
              Trattamenti osteopatici specializzati e percorsi personalizzati per ogni persona.
            </p>
            <a href={MAPS_HREF} target="_blank" rel="noopener noreferrer" className="mx-footer__info mx-footer__info--link">
              <MapPin size={17} />
              <span>
                Via Peyron 54, Torino
                <small>Comodo con la metro · Apri in Maps</small>
              </span>
            </a>
            <p className="mx-footer__info">
              <Clock size={17} />
              <span>
                Lun-Ven 8:00-21:00
                <small>Sabato 9:00-18:00</small>
              </span>
            </p>
          </motion.div>

          <motion.nav className="mx-footer__col" aria-label="Esplora" {...reveal(0.1)}>
            <p className="mx-footer__title">Esplora</p>
            <ul className="mx-footer__links">
              {explore.map((item) => (
                <li key={item.href}>
                  <Link to={item.href} onClick={() => window.scrollTo(0, 0)}>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>

          <motion.div className="mx-footer__col" {...reveal(0.15)}>
            <p className="mx-footer__title">Contatti</p>
            <ul className="mx-footer__links">
              <li>
                <a href={BOOKING_HREF} target="_blank" rel="noopener noreferrer">
                  <MessageCircle size={16} />
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={PHONE_HREF}>
                  <Phone size={16} />
                  Chiama lo studio
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`}>
                  <Mail size={16} />
                  Scrivi una email
                </a>
              </li>
            </ul>
          </motion.div>

          <motion.div className="mx-footer__col" {...reveal(0.2)}>
            <p className="mx-footer__title">Seguici</p>
            <div className="mx-footer__socials">
              {socials.map(({ name, href, Icon }) => (
                <a key={name} href={href} target="_blank" rel="noopener noreferrer" aria-label={name} title={name}>
                  <Icon width={19} height={19} />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Logo a tutta larghezza che sfuma nel fondo */}
      <motion.div
        className="mx-footer__mark"
        aria-hidden="true"
        initial={{ y: '30%', opacity: 0 }}
        whileInView={{ y: '0%', opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: EASE }}
      >
        <img src="/logo_verde.png" alt="" loading="lazy" decoding="async" />
      </motion.div>

      <div className="mx-footer__bottom">
        <div className="mx-footer__wrap mx-footer__bottom-row">
          <p>© {year} Studio Mobilitas · P.IVA 13020400019</p>
          <div className="mx-footer__legal">
            <a href="https://www.iubenda.com/privacy-policy/67925714" target="_blank" rel="noopener noreferrer">
              Privacy Policy
            </a>
            <a href="https://www.iubenda.com/privacy-policy/67925714/cookie-policy" target="_blank" rel="noopener noreferrer">
              Cookie Policy
            </a>
            <button type="button" onClick={toTop} className="mx-footer__top">
              Torna su
              <ArrowUp size={15} strokeWidth={2.4} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
