import { useState, useEffect, useRef } from 'react'
import { motion, animate, useReducedMotion } from 'framer-motion'
import { Activity, BatteryCharging, Check, Timer, Trophy } from 'lucide-react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import PageShell from '../../components/site/PageShell'
import WhatsAppIcon from '../../components/whatsapp/WhatsAppIcon'
import { EASE } from '../../components/home-sections/homeMotion'
import '../../styles/pages/gpadel-39.css'

const PHOTO = '/landing-pages/web/lm-gpadel-foto1'
const PHOTO2 = '/landing-pages/web/inf1'

const fade = (delay, y = 24) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: EASE, delay },
})

// Il prezzo scende da 90 a 39 una volta sola, all'apertura
const PriceDrop = () => {
  const reduce = useReducedMotion()
  const [value, setValue] = useState(reduce ? 39 : 90)

  useEffect(() => {
    if (reduce) return
    const controls = animate(90, 39, {
      duration: 1.5,
      delay: 0.7,
      ease: [0.3, 0, 0.2, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    })
    return () => controls.stop()
  }, [reduce])

  return (
    <span className={`mx-g39-price__new ${value === 39 ? 'is-landed' : ''}`}>{value}€</span>
  )
}

const offerItems = ['Anamnesi generale', 'Valutazione posturale', 'Trattamento specifico per te', 'Consigli per stare meglio']

const benefitIcons = [Activity, Timer, BatteryCharging, Trophy]

export default function LmGpadelSconto39() {
  const [showDock, setShowDock] = useState(false)
  const heroCtaRef = useRef(null)
  const endCtaRef = useRef(null)

  // SEO metadata for GPADEL Sconto 39€ landing page
  useEffect(() => {
    const previousTitle = document.title
    document.title = 'Trattamento Osteopatico 39€ per Padelisti | Offerta Esclusiva GPADEL | Mobilitas Torino'

    const ensureMetaByName = (name, content) => {
      let tag = document.querySelector(`meta[name="${name}"]`)
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('name', name)
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', content)
    }

    const ensureMetaByProperty = (property, content) => {
      let tag = document.querySelector(`meta[property="${property}"]`)
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('property', property)
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', content)
    }

    const ensureCanonical = (href) => {
      let link = document.querySelector('link[rel="canonical"]')
      if (!link) {
        link = document.createElement('link')
        link.setAttribute('rel', 'canonical')
        document.head.appendChild(link)
      }
      link.setAttribute('href', href)
    }

    const description = 'Trattamento osteopatico completo a 39€ invece di 90€ per padelisti. Offerta esclusiva GPADEL: anamnesi, valutazione posturale, trattamento personalizzato e consigli. Prevenzione infortuni e miglioramento performance. Studio Mobilitas Torino.'
    const pageUrl = `${window.location.origin}/lm-gpadel-sconto39`

    // Standard SEO
    ensureMetaByName('description', description)
    ensureMetaByName('robots', 'index, follow')
    ensureMetaByName('keywords', 'trattamento osteopatico padelisti, osteopata padel torino, sconto padelisti, offerta gpadel, trattamento osteopatico 39€, prevenzione infortuni padel, osteopatia sportiva torino, trattamento posturale padel, studio osteopatico torino padelisti')

    // Open Graph
    ensureMetaByProperty('og:title', 'Trattamento Osteopatico 39€ per Padelisti | Offerta Esclusiva GPADEL')
    ensureMetaByProperty('og:description', description)
    ensureMetaByProperty('og:type', 'website')
    ensureMetaByProperty('og:url', pageUrl)
    ensureMetaByProperty('og:site_name', 'Mobilitas – Studio Osteopatico Torino')

    // Twitter Card
    ensureMetaByName('twitter:card', 'summary_large_image')
    ensureMetaByName('twitter:title', 'Trattamento Osteopatico 39€ per Padelisti | Offerta Esclusiva GPADEL')
    ensureMetaByName('twitter:description', description)

    // Canonical
    ensureCanonical(pageUrl)

    return () => {
      document.title = previousTitle
    }
  }, [])

  // Barra fissa su mobile quando la CTA dell'hero non è più visibile
  useEffect(() => {
    const hero = heroCtaRef.current
    const end = endCtaRef.current
    if (!hero || !('IntersectionObserver' in window)) return
    const seen = { hero: true, end: false }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.target === hero) seen.hero = e.isIntersecting
        if (e.target === end) seen.end = e.isIntersecting
      })
      setShowDock(!seen.hero && !seen.end && hero.getBoundingClientRect().top < 0)
    })
    io.observe(hero)
    if (end) io.observe(end)
    return () => io.disconnect()
  }, [])

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Ciao, vorrei prenotare il trattamento osteopatico scontato a 39€ tramite offerta GPADEL. Quando avete posto? Grazie e a presto!");
    window.open(`https://wa.me/393518198457?text=${message}`, '_blank');
  }

  const benefits = [
    {
      title: "Risoluzione dei dolori",
      description: "Riduce o elimina dolori acuti e cronici legati alla postura, allo stress o ad abitudini scorrette, anche quelli a cui ti sei abituato senza accorgertene."
    },
    {
      title: "Recupero più veloce e profondo",
      description: "Migliora la circolazione e favorisce il rilassamento muscolare, permettendoti di recuperare più rapidamente dopo giornate intense o stressanti."
    },
    {
      title: "Più energia e leggerezza nel corpo",
      description: "Aiuta a riequilibrare il sistema muscolo-scheletrico e neurovegetativo, migliorando sonno, respirazione e vitalità generale."
    },
    {
      title: "Per sportivi e padelisti",
      description: "Previene infortuni e migliora le performance: riduce il rischio di lesioni a spalla, gomito e caviglie, potenzia la coordinazione e rende i movimenti più fluidi e reattivi in campo."
    }
  ]

  const renderCta = (btnRef) => (
    <button
      ref={btnRef}
      type="button"
      onClick={handleWhatsAppClick}
      className="mx-btn mx-btn--primary mx-g39-cta"
    >
      <span className="mx-g39-cta__txt">
        <span className="mx-g39-cta__main">Prenota il trattamento scontato</span>
        <span className="mx-g39-cta__sub">(Con offerta esclusiva GPADEL)</span>
      </span>
      <span className="mx-btn__icon">
        <WhatsAppIcon size={22} />
      </span>
    </button>
  )

  return (
    <>
      <Header />

      <PageShell className="mx-g39">
        {/* HERO SECTION: il prezzo come protagonista */}
        <section className="mx-g39-hero">
          <motion.div
            className="mx-g39-hero__photo"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.6, ease: EASE }}
          >
            <img
              src={`${PHOTO}-1600.jpg`}
              srcSet={`${PHOTO}-900.jpg 900w, ${PHOTO}-1600.jpg 1600w`}
              sizes="(min-width: 1024px) 55vw, 100vw"
              alt="Trattamento osteopatico per padelisti"
              width="1600"
              height="900"
              fetchPriority="high"
            />
          </motion.div>

          <div className="mx-wrap mx-g39-hero__grid">
            <div className="mx-g39-hero__head">
              {/* Badge */}
              <motion.div className="mx-g39-badge" {...fade(0.15, 14)}>
                <span className="mx-g39-badge__dot" />
                <span>Offerta Esclusiva GPADEL</span>
              </motion.div>

              {/* Main Headline */}
              <motion.h1 className="mx-h mx-g39-title" {...fade(0.25)}>
                <span className="mx-g39-title__a">
                  Trattamento Osteopatico
                </span>
                <span className="mx-g39-title__b mx-gradient">
                  Specifico per le tue esigenze
                </span>
              </motion.h1>
            </div>

            {/* Offer: il biglietto */}
            <motion.div
              className="mx-g39-ticket"
              initial={{ opacity: 0, y: 40, rotate: -2.5 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.35 }}
            >
              <div className="mx-g39-ticket__card">
              <div className="mx-g39-ticket__main">
                <h3 className="mx-h mx-g39-ticket__title">
                  Trattamento Osteopatico (durata di 1h)
                </h3>
                <ul className="mx-g39-ticket__list">
                  {offerItems.map((item) => (
                    <li key={item}>
                      <span className="mx-g39-ticket__check"><Check size={13} strokeWidth={3.4} /></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mx-g39-ticket__stub">
                <span className="mx-g39-price__lbl">A soli:</span>
                <span className="mx-g39-price__old">
                  90€
                  <motion.i
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.5, ease: EASE, delay: 0.55 }}
                  />
                </span>
                <PriceDrop />
              </div>
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div className="mx-g39-hero__cta" {...fade(0.55)}>
              {renderCta(heroCtaRef)}
            </motion.div>
          </div>
        </section>

        {/* BENEFITS SECTION */}
        <section className="mx-section mx-g39-benefits">
          <div className="mx-wrap">
            <div className="mx-g39-benefits__head">
              <div className="mx-g39-badge mx-g39-badge--soft">
                <span className="mx-g39-badge__dot" />
                <span>I Benefici del trattamento</span>
              </div>
              <h2 className="mx-h mx-h--lg mx-g39-benefits__title">
                Perché scegliere il
                <span className="mx-gradient">
                  Trattamento Osteopatico?
                </span>
              </h2>
            </div>

            <div className="mx-g39-benefits__layout">
              <motion.figure
                className="mx-g39-figure"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                transition={{ duration: 1.1, ease: EASE }}
              >
                <img
                  src={`${PHOTO2}-1600.jpg`}
                  srcSet={`${PHOTO2}-900.jpg 900w, ${PHOTO2}-1600.jpg 1600w`}
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  alt="Trattamento osteopatico"
                  width="1600"
                  height="900"
                  loading="lazy"
                  decoding="async"
                />
                <span className="mx-g39-figure__tag" aria-hidden="true">39€</span>
              </motion.figure>

              {/* Benefits List */}
              <ul className="mx-g39-blist">
                {benefits.map((benefit, index) => {
                  const Icon = benefitIcons[index]
                  return (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
                      transition={{ duration: 0.8, ease: EASE, delay: index * 0.07 }}
                      className="mx-g39-benefit"
                    >
                      <span className="mx-g39-benefit__icon"><Icon size={22} strokeWidth={2.2} /></span>
                      <div>
                        <h3 className="mx-h mx-h--sm">{benefit.title}</h3>
                        <p className="mx-g39-benefit__text">{benefit.description}</p>
                      </div>
                    </motion.li>
                  )
                })}
              </ul>
            </div>

            {/* CTA Button */}
            <motion.div
              className="mx-g39-end"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: EASE }}
            >
              <div className="mx-g39-end__price" aria-hidden="true">
                <s>90€</s>
                <b>39€</b>
              </div>
              {renderCta(endCtaRef)}
            </motion.div>
          </div>
        </section>

        {/* Barra fissa mobile */}
        <div className={`mx-g39-dock ${showDock ? 'is-on' : ''}`} aria-hidden={!showDock}>
          <button type="button" className="mx-g39-dock__btn" onClick={handleWhatsAppClick} tabIndex={showDock ? 0 : -1}>
            <span className="mx-g39-dock__price" aria-hidden="true">39€</span>
            <span className="mx-g39-dock__lbl">Prenota il trattamento scontato</span>
            <WhatsAppIcon size={20} />
          </button>
        </div>
      </PageShell>

      <Footer />
    </>
  )
}
