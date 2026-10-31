import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence, useInView, useScroll, useSpring, useTransform } from 'framer-motion'
import {
  ArrowUpRight,
  Check,
  Brain,
  Bone,
  BicepsFlexed,
  Footprints,
  Soup,
  Wind,
  Venus,
  Stethoscope,
  MapPin,
  TrainFront,
  CarFront,
} from 'lucide-react'
import PageShell from '../../components/site/PageShell'
import LeadFormSheet from '../../components/landing/LeadFormSheet'
import { salvaRichiesta } from '../../components/prenota-visita/richiestaSalvata'
import { Kicker, MaskLines, Reveal } from '../../components/home-sections/HomeKit'
import { EASE } from '../../components/home-sections/homeMotion'
import '../../styles/pages/offerta-yt.css'

// Concetto: "Dal video allo studio". Chi arriva da YouTube ha appena guardato un nostro video:
// la pagina continua quel linguaggio. L'apertura è un player con la barra di avanzamento che
// riparte da dove eri, le sezioni sono capitoli, i problemi sono una playlist e su telefono la
// barra dei capitoli resta in basso insieme alla prenotazione.

const bodyAreas = [
  {
    icon: Brain,
    title: "Testa, Collo e Sistema Nervoso",
    problems: [
      "Cervicalgia", "Emicrania", "Mal di testa tensivo", "Vertigini", "Acufeni",
      "Colpo di frusta", "Dolori mandibolari (ATM)", "Bruxismo", "Click mandibolare",
      "Difficoltà di concentrazione", "Ansia somatizzata", "Disturbi del sonno",
      "Tensione da postura al PC", "Cefalea da stress", "Tensione cranica nei bambini",
      "Nebbia mentale", "Irritabilità nei neonati"
    ]
  },
  {
    icon: Bone,
    title: "Schiena, Bacino e Postura",
    problems: [
      "Lombalgia", "Dorsalgia", "Sciatalgia", "Ernia del disco", "Dolore al coccige",
      "Dolore pelvico cronico", "Mal di schiena da postura", "Problemi posturali",
      "Asimmetrie bacino/spalle", "Tensioni posturali da ansia", "Postura curva da terza età",
      "Rigidità articolare mattutina", "Dolore dopo cadute", "Instabilità da fermi",
      "Dolori dopo uso di bastoni", "Recupero post-operatorio", "Tensioni lombari in gravidanza"
    ]
  },
  {
    icon: BicepsFlexed,
    title: "Arti Superiori",
    problems: [
      "Epicondilite", "Tunnel carpale", "Formicolii a braccia e mani", "Dolori articolari diffusi",
      "Dolore alla spalla", "Mani deboli o doloranti", "Rigidità articolare del braccio",
      "Dolore durante l'allenamento", "Dolore da supporti tecnologici"
    ]
  },
  {
    icon: Footprints,
    title: "Arti Inferiori",
    problems: [
      "Dolore al ginocchio", "Fascite plantare", "Piedi gonfi", "Dolori di crescita alle gambe",
      "Anche rigide o artrosiche", "Difficoltà a camminare", "Salite e discese faticose",
      "Edemi agli arti inferiori", "Debolezza posturale nel passo", "Dolori alle gambe in gravidanza"
    ]
  },
  {
    icon: Soup,
    title: "Sistema Digestivo e Gastrointestinale",
    problems: [
      "Reflusso gastrico", "Gonfiore addominale", "Colon irritabile", "Stitichezza",
      "Diarrea ricorrente", "Pancia gonfia o dura", "Digestione lenta", "Irritabilità intestinale da stress",
      "Problemi digestivi legati alla postura", "Malassorbimento posturale", "Dolori addominali ciclici"
    ]
  },
  {
    icon: Wind,
    title: "Sistema Respiratorio e Diaframma",
    problems: [
      "Fiato corto", "Diaframma rigido", "Difficoltà respiratorie", "Respirazione superficiale da stress",
      "Respiro bloccato in gravidanza", "Asma funzionale", "Oppressione toracica da postura",
      "Affaticamento nel parlare", "Difficoltà a respirare profondamente"
    ]
  },
  {
    icon: Venus,
    title: "Area Donna e Sistema Uro-Ginecologico",
    problems: [
      "Dolori mestruali", "Ciclo irregolare", "Sindrome premestruale acuta", "Endometriosi (supporto sintomatico)",
      "Dispareunia", "Tensioni pelviche", "Difficoltà nel concepimento", "Diastasi addominale post-parto",
      "Rigidità del bacino post-parto", "Incontinenza urinaria", "Inestetismi da ritenzione",
      "Dolori legati a scarpe con tacco"
    ]
  }
]

const specializations = [
  "Gravidanza e Pediatria",
  "Geriatria e Terza Età",
  "Postura e Lavori Pesanti",
  "Sport e Performance",
  "Postura e Lavoro Sedentario",
  "E tutto quello che ti serve!"
]

// I capitoli riprendono le etichette delle sezioni
const CHAPTERS = [
  { id: 'oyt-intro', label: 'Studio Osteopatico Torino' },
  { id: 'oyt-problemi', label: 'Problemi che Risolviamo' },
  { id: 'oyt-dove', label: 'Dove Siamo' },
]

const MAP_SRC = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2817.274078923546!2d7.65514387704107!3d45.08023495897442!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfe2e29f381fdc93%3A0x97eee174cab07ada!2sMobilitas%20-%20Studio%20Osteopatico%20-%20Osteopata%20Torino!5e0!3m2!1sit!2sit!4v1760785981478!5m2!1sit!2sit'

const pad = (n) => String(n).padStart(2, '0')

const BookButton = ({ lines, onClick, className = '' }) => (
  <motion.button type="button" whileTap={{ scale: 0.97 }} onClick={onClick} className={`mx-btn mx-btn--primary mx-oyt-cta ${className}`}>
    <span className="mx-oyt-cta__txt">
      {lines.map((l) => (
        <span key={l}>{l}</span>
      ))}
    </span>
    <span className="mx-btn__icon"><ArrowUpRight size={22} strokeWidth={2.4} /></span>
  </motion.button>
)

// Barra dei capitoli: avanza con la lettura della pagina, come la timeline di un video
const ChapterBar = ({ progress, compact = false }) => {
  const width = useTransform(progress, (v) => `${Math.min(100, Math.max(0, v * 100))}%`)
  return (
    <div className={`mx-oyt-scrub ${compact ? 'mx-oyt-scrub--compact' : ''}`} aria-hidden="true">
      <div className="mx-oyt-scrub__track">
        {CHAPTERS.map((c) => (
          <span key={c.id} className="mx-oyt-scrub__seg" />
        ))}
        <motion.i className="mx-oyt-scrub__fill" style={{ width }} />
        <motion.b className="mx-oyt-scrub__head" style={{ left: width }} />
      </div>
    </div>
  )
}

const OffertaYT = () => {
  const navigate = useNavigate()
  const [currentMonth, setCurrentMonth] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    nome: '',
    cognome: '',
    cellulare: '',
    email: '',
    privacy: false
  })
  const [formErrors, setFormErrors] = useState({})
  const heroCtaRef = useRef(null)
  const heroCtaInView = useInView(heroCtaRef, { margin: '0px 0px -40px 0px' })
  const [scrolledPastTop, setScrolledPastTop] = useState(false)
  const [chapter, setChapter] = useState(0)

  // Avanzamento di lettura (guida la barra dei capitoli)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 })

  useEffect(() => {
    setCurrentMonth(
      [
        'GENNAIO', 'FEBBRAIO', 'MARZO', 'APRILE', 'MAGGIO', 'GIUGNO',
        'LUGLIO', 'AGOSTO', 'SETTEMBRE', 'OTTOBRE', 'NOVEMBRE', 'DICEMBRE'
      ][new Date().getMonth()]
    )
  }, [])

  // Capitolo corrente e comparsa del dock
  useEffect(() => {
    const onScroll = () => {
      setScrolledPastTop(window.scrollY > 320)
      const mid = window.innerHeight * 0.45
      let current = 0
      CHAPTERS.forEach((c, i) => {
        const el = document.getElementById(c.id)
        if (el && el.getBoundingClientRect().top < mid) current = i
      })
      setChapter(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Handle ESC key to close form
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && showForm) {
        setShowForm(false)
      }
    }

    if (showForm) {
      document.addEventListener('keydown', handleEscKey)
      return () => document.removeEventListener('keydown', handleEscKey)
    }
  }, [showForm])

  // SEO metadata for Offerta YT landing page (keyword-optimized)
  useEffect(() => {
    const previousTitle = document.title
    document.title = 'Offerta YT | Studio Osteopatico Mobilitas: Mal di Schiena, Cervicale, Emicrania'

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

    const description = 'Cerchi un osteopata a Torino? Mobilitas è lo studio osteopatico specializzato in mal di schiena, cervicale, sciatalgia, emicrania e postura. Valutazione + trattamento prima visita a 49€. Prenota online o via WhatsApp.'
    const pageUrl = `${window.location.origin}/offerta-yt`

    // Standard SEO
    ensureMetaByName('description', description)
    ensureMetaByName('robots', 'index, follow')
    ensureMetaByName('keywords', 'osteopata torino, studio osteopatico torino, osteopatia torino, mal di schiena torino, cervicale torino, sciatalgia torino, emicrania torino, postura torino, trattamento osteopatico, prima visita 49€')

    // Open Graph
    ensureMetaByProperty('og:title', 'Offerta YT | Studio Osteopatico Mobilitas')
    ensureMetaByProperty('og:description', description)
    ensureMetaByProperty('og:type', 'website')
    ensureMetaByProperty('og:url', pageUrl)
    ensureMetaByProperty('og:site_name', 'Mobilitas – Studio Osteopatico Torino')

    // Canonical
    ensureCanonical(pageUrl)

    return () => {
      document.title = previousTitle
    }
  }, [])

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    console.log('Form submitted!') // Debug log
    setFormErrors({})

    const errors = {}

    // Validazione nome
    if (!formData.nome.trim() || formData.nome.length < 2) {
      errors.nome = 'Il nome deve essere di almeno 2 caratteri'
    }

    // Validazione cognome
    if (!formData.cognome.trim() || formData.cognome.length < 2) {
      errors.cognome = 'Il cognome deve essere di almeno 2 caratteri'
    }

    // Validazione cellulare
    if (!formData.cellulare.trim() || formData.cellulare.length < 10) {
      errors.cellulare = 'Inserisci un numero di cellulare valido'
    }

    // Validazione email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      errors.email = 'Inserisci un indirizzo email valido'
    }

    // Validazione privacy
    if (!formData.privacy) {
      errors.privacy = 'Devi accettare la privacy policy'
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    console.log('Redirecting to confirmation page...') // Debug log

    // Send data to Zapier webhook
    try {
      // Format date and time as requested: dd/mm/yyyy and hh:mm
      const now = new Date()
      const day = String(now.getDate()).padStart(2, '0')
      const month = String(now.getMonth() + 1).padStart(2, '0')
      const year = now.getFullYear()
      const hours = String(now.getHours()).padStart(2, '0')
      const minutes = String(now.getMinutes()).padStart(2, '0')

      const webhookData = {
        nome: formData.nome,
        cognome: formData.cognome,
        telefono: formData.cellulare,
        email: formData.email,
        data: `${day}/${month}/${year}`,
        ora: `${hours}:${minutes}`,
        offerta: 'Trattamento osteopatico da 90€ a 49€',
        pagina: 'Offerta YT',
        privacy_accettata: formData.privacy
      }

      // Send data to Zapier webhook (same approach as gravidanza landing)
      const response = await fetch('https://hooks.zapier.com/hooks/catch/19401274/urmpgqj/', {
        method: 'POST',
        body: JSON.stringify(webhookData)
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      console.log('Zapier webhook response:', result)
      console.log('Data sent to Zapier successfully')
    } catch (error) {
      console.error('Error sending data to Zapier:', error)
      // Don't block the user flow if webhook fails
    }

    // Redirect to confirmation page
    // Conferma unica: testo generico e niente calendario (nessun id/token), ma la conversione Google Ads
    // giusta (stessa di osteopata Torino) grazie al pageContext
    salvaRichiesta({ pageContext: 'offerta-yt' })
    try {
      navigate('/conferma-richiesta')
    } catch (error) {
      console.error('Navigation error:', error)
      // Fallback to window.location
      window.location.href = '/conferma-richiesta'
    }
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const openForm = () => setShowForm(true)
  const showDock = scrolledPastTop && !heroCtaInView && !showForm

  return (
    <PageShell className="mx-oyt">
      <LeadFormSheet
        open={showForm}
        onClose={() => setShowForm(false)}
        tone="yt"
        title="Compila il form"
        intro={
          <>
            Dopo che avrai compilato il form, la nostra segreteria ti contatterà per prendere appuntamento.
            Prenota subito il tuo trattamento prima che i posti esauriscano! 👇🏼
          </>
        }
        formData={formData}
        formErrors={formErrors}
        onChange={handleInputChange}
        onSubmit={handleFormSubmit}
      />

      {/* ============ CAPITOLO 1: il player ============ */}
      <header className="mx-oyt-hero" id="oyt-intro">
        <div className="mx-oyt-hero__beam" aria-hidden="true" />
        <div className="mx-wrap mx-oyt-hero__grid">
          <div className="mx-oyt-hero__copy">
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }}>
              <Kicker n="01">Studio Osteopatico Torino</Kicker>
            </motion.div>
            <h1 className="mx-h mx-oyt-hero__title">
              <MaskLines
                immediate
                delay={0.1}
                lines={[{ text: 'Hai bisogno di' }, { text: 'un Osteopata Bravo con Esperienza?', className: 'mx-gradient' }]}
              />
            </h1>
          </div>

          {/* Il "video" prosegue: foto dello studio in un player */}
          <motion.figure
            className="mx-oyt-player"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.25 }}
          >
            <div className="mx-oyt-player__screen">
              <img
                src="/home/web/home2-900.jpg"
                srcSet="/home/web/home2-900.jpg 900w, /home/web/home2-1600.jpg 1600w"
                sizes="(min-width: 1024px) 620px, 92vw"
                alt="Trattamento osteopatico nello studio Mobilitas"
                fetchPriority="high"
                decoding="async"
              />
              <span className="mx-oyt-player__chip">
                <img src="/pittogramma.png" alt="" />
                Mobilitas
              </span>
            </div>
            <div className="mx-oyt-player__bar">
              <span className="mx-oyt-player__time" aria-hidden="true">
                <motion.i initial={{ width: '0%' }} animate={{ width: '38%' }} transition={{ duration: 2.4, ease: EASE, delay: 0.6 }} />
              </span>
              <ol className="mx-oyt-player__chapters">
                {CHAPTERS.map((c, i) => (
                  <li key={c.id} className={i === 0 ? 'is-on' : ''}>
                    <a href={`#${c.id}`}>
                      <b>{pad(i + 1)}</b>
                      {c.label}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </motion.figure>

          <motion.div
            className="mx-oyt-hero__offer"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.4 }}
          >
            <p className="mx-oyt-seats">
              <span className="mx-oyt-seats__dot" aria-hidden="true" />
              35 posti con offerta SOLO per {currentMonth}
            </p>
            <p className="mx-oyt-price">
              Da <s>90€</s> a <b className="mx-oyt-price__new">49€</b> <span>in offerta di {currentMonth.toLowerCase()}</span>
            </p>
            <div ref={heroCtaRef}>
              <BookButton lines={['PRENOTA IL TRATTAMENTO', "CON L'OFFERTA"]} onClick={openForm} className="mx-oyt-cta--hero" />
            </div>
          </motion.div>

          <motion.div
            className="mx-oyt-hero__more"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.55 }}
          >
            <p className="mx-lead mx-oyt-hero__lead">
              <strong>Mobilitas</strong> è lo studio osteopatico più importante di Torino.
              Da noi trovi l'osteopata giusto per te, specializzato sul tuo problema.
            </p>
            <ul className="mx-oyt-benefits">
              {[
                "Anamnesi completa e valutazione posturale",
                "Trattamento osteopatico specializzato per te",
                "Consigli per prevenire ricadute",
              ].map((benefit) => (
                <li key={benefit}>
                  <Check size={16} strokeWidth={3} />
                  {benefit}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </header>

      {/* ============ CAPITOLO 2: la playlist dei problemi ============ */}
      <section className="mx-section mx-section--deep mx-oyt-problems" id="oyt-problemi">
        <div className="mx-wrap">
          <div className="mx-oyt-head">
            <Kicker n="02">Problemi che Risolviamo</Kicker>
            <h2 className="mx-h mx-h--lg">
              <MaskLines lines={[{ text: 'I problemi che trattiamo' }, { text: 'e risolviamo', className: 'mx-gradient' }]} />
            </h2>
            <Reveal>
              <p className="mx-lead mx-oyt-head__lead">
                Specializzati in tutte le aree del corpo, trattiamo ogni tipo di problema con approcci osteopatici mirati e personalizzati 💪🏼
              </p>
            </Reveal>
          </div>

          <ol className="mx-oyt-playlist">
            {bodyAreas.map((area, index) => {
              const Icon = area.icon
              return (
                <Reveal as="li" key={area.title} className="mx-oyt-track" delay={(index % 2) * 0.08}>
                  <span className="mx-oyt-track__thumb">
                    <Icon size={30} strokeWidth={1.8} />
                    <span className="mx-oyt-track__count">{area.problems.length}</span>
                  </span>
                  <span className="mx-oyt-track__body">
                    <span className="mx-oyt-track__n">{pad(index + 1)}</span>
                    <h3 className="mx-h mx-h--sm">{area.title}</h3>
                    <span className="mx-oyt-track__list">
                      {area.problems.slice(0, 8).map((problem) => (
                        <span key={problem}>{problem}</span>
                      ))}
                    </span>
                    {area.problems.length > 8 && (
                      <span className="mx-oyt-track__more">
                        +{area.problems.length - 8} altri problemi...
                      </span>
                    )}
                  </span>
                </Reveal>
              )
            })}
          </ol>

          {/* Schermata finale: gli specialisti */}
          <Reveal className="mx-oyt-end">
            <div className="mx-oyt-end__copy">
              <span className="mx-oyt-end__icon"><Stethoscope size={26} /></span>
              <h3 className="mx-h mx-h--md">Osteopati Specializzati per Ogni Area</h3>
              <p className="mx-body">
                Il nostro team di osteopati è specializzato in diverse aree per garantirti il trattamento più efficace:
              </p>
            </div>
            <ul className="mx-oyt-end__grid">
              {specializations.map((s, i) => (
                <li key={s}>
                  <span>{pad(i + 1)}</span>
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="mx-oyt-center">
            <BookButton lines={['PRENOTA LA TUA PRIMA', 'VISITA CON OFFERTA']} onClick={openForm} />
          </Reveal>
        </div>
      </section>

      {/* ============ CAPITOLO 3: dove siamo ============ */}
      <section className="mx-section mx-section--glow mx-oyt-where" id="oyt-dove">
        <div className="mx-wrap mx-oyt-where__grid">
          <div>
            <Kicker n="03">Dove Siamo</Kicker>
            <h2 className="mx-h mx-h--lg">
              <MaskLines lines={[{ text: 'Vieni a trovarci' }, { text: 'nel cuore di Torino', className: 'mx-gradient' }]} />
            </h2>
            <Reveal>
              <p className="mx-lead mx-oyt-where__lead">
                I nostri due studi si trovano in posizioni strategiche a Torino,
                facilmente raggiungibili con i mezzi pubblici e con parcheggio nelle vicinanze.
              </p>
            </Reveal>
            <Reveal className="mx-oyt-where__facts">
              <span><MapPin size={18} />Via Peyron 54, Torino (San Donato)</span>
              <span><MapPin size={18} />Via Lamarmora 35, Torino (Crocetta)</span>
              <span><TrainFront size={18} />Metro: Bernini o Principi d'Acaja per Via Peyron, Re Umberto per Via Lamarmora</span>
              <span><CarFront size={18} />Parcheggi vicino a entrambi gli studi + strisce blu</span>
            </Reveal>
            <Reveal className="mx-oyt-where__cta">
              <BookButton lines={['PRENOTA LA TUA PRIMA', 'VISITA CON OFFERTA']} onClick={openForm} />
            </Reveal>
          </div>

          <Reveal className="mx-oyt-where__map" delay={0.1}>
            <div className="mx-oyt-where__frame">
              <iframe
                src={MAP_SRC}
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mappa Mobilitas Torino"
              ></iframe>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Barra dei capitoli + prenotazione (telefono) */}
      <AnimatePresence>
        {showDock && (
          <motion.div
            className="mx-oyt-dock"
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 120, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
          >
            <div className="mx-oyt-dock__info">
              <span className="mx-oyt-dock__chapter">
                <small>{pad(chapter + 1)} / {pad(CHAPTERS.length)}</small> {CHAPTERS[chapter].label}
              </span>
              <ChapterBar progress={progress} compact />
            </div>
            <button type="button" className="mx-oyt-dock__btn" onClick={openForm}>
              <span>PRENOTA IL TRATTAMENTO</span>
              <ArrowUpRight size={18} strokeWidth={2.6} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </PageShell>
  )
}

export default OffertaYT
