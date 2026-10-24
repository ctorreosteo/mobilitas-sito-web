import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence, useInView } from 'framer-motion'
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
  ArrowLeft,
  ArrowRight,
  Gift,
} from 'lucide-react'
import PageShell from '../../components/site/PageShell'
import { parseCellulare } from '../../utils/phone'
import LeadFormSheet from '../../components/landing/LeadFormSheet'
import { Kicker, MaskLines, Reveal, Snap } from '../../components/home-sections/HomeKit'
import { EASE } from '../../components/home-sections/homeMotion'
import '../../styles/pages/offerta-influencer.css'

// Concetto: "Il codice della community". Chi arriva da un influencer ha in mano un codice:
// la pagina è costruita attorno a quel codice. In apertura c'è il buono con lo spazio per
// scriverlo: il codice si imprime sul buono, arriva il timbro -50% e il modulo si apre già
// compilato con il codice. Lo stesso buono accompagna il dock su telefono.

const API_BASE = import.meta.env.VITE_API_BASE
  || 'https://mobilitas-backend-990845221858.europe-west8.run.app'

const cleanName = (name) =>
  name.trim().replace(/\s+/g, ' ').split(' ').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join(' ')

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

const benefits = [
  "Trattamento posturale e di prevenzione",
  "Anamnesi completa e valutazione posturale",
  "Trattamento osteopatico specializzato per te",
  "Consigli personalizzati per evitare ricadute",
  "Studio nel cuore di Torino, facilmente raggiungibile",
  "Studio più scelto di Torino e con più recensioni d'Italia"
]

const specializations = [
  "Gravidanza e Pediatria",
  "Geriatria e Terza Età",
  "Postura e Lavori Pesanti",
  "Sport e Performance",
  "Postura e Lavoro Sedentario",
  "E tutto quello che ti serve!"
]

const MAP_SRC = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2817.274078923546!2d7.65514387704107!3d45.08023495897442!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfe2e29f381fdc93%3A0x97eee174cab07ada!2sMobilitas%20-%20Studio%20Osteopatico%20-%20Osteopata%20Torino!5e0!3m2!1sit!2sit!4v1760785981478!5m2!1sit!2sit'

const BookButton = ({ lines, onClick, className = '' }) => (
  <motion.button type="button" whileTap={{ scale: 0.97 }} onClick={onClick} className={`mx-btn mx-btn--primary mx-oinf-cta ${className}`}>
    <span className="mx-oinf-cta__txt">
      {lines.map((l) => (
        <span key={l}>{l}</span>
      ))}
    </span>
    <span className="mx-btn__icon"><ArrowUpRight size={22} strokeWidth={2.4} /></span>
  </motion.button>
)

// ---------- Il buono ----------
const Coupon = ({ code, onCodeChange, onSubmit }) => {
  const shown = code.trim().toUpperCase()
  return (
    <div className="mx-oinf-coupon">
      <span className="mx-oinf-coupon__sticker" aria-hidden="false">Perfetto! 🎉</span>

      <div className="mx-oinf-coupon__main">
        <span className="mx-oinf-coupon__tag">🎁 Offerta Esclusiva con Codice Influencer</span>
        <p className="mx-oinf-coupon__row">
          <span>Prezzo normale: </span>
          <s>90€</s>
        </p>
        <p className="mx-oinf-coupon__row mx-oinf-coupon__row--big">
          <span>Con il codice sconto: </span>
          <b>45€</b>
        </p>
        <p className="mx-oinf-coupon__save">
          Risparmi 45€ (50% di sconto) 🎉
        </p>

      </div>

      <AnimatePresence>
        {shown && (
          <motion.span
            key="stamp"
            className="mx-oinf-coupon__stamp"
            aria-hidden="true"
            initial={{ scale: 2.4, opacity: 0, rotate: -30 }}
            animate={{ scale: 1, opacity: 1, rotate: -14 }}
            exit={{ scale: 0.6, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 380, damping: 18 }}
          >
            -50%
          </motion.span>
        )}
      </AnimatePresence>

      <form
        className="mx-oinf-coupon__stub"
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit()
        }}
      >
        <label className="mx-oinf-coupon__label" htmlFor="mx-oinf-code">
          <span className="mx-oinf-coupon__code" aria-hidden="true">
            {shown ? (
              <motion.span key={shown} initial={{ y: 6, opacity: 0.4 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.25 }}>
                {shown}
              </motion.span>
            ) : (
              <span className="is-empty">• • • • • •</span>
            )}
          </span>
        </label>
        <input
          id="mx-oinf-code"
          className="mx-oinf-coupon__input"
          type="text"
          name="codiceSconto"
          value={code}
          onChange={onCodeChange}
          placeholder="Inserisci il codice sconto del tuo influencer"
          autoComplete="off"
          autoCapitalize="characters"
          spellCheck={false}
          enterKeyHint="go"
        />
      </form>
    </div>
  )
}

const OffertaInfluencer = () => {
  const navigate = useNavigate()
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    nome: '',
    cognome: '',
    cellulare: '',
    email: '',
    codiceSconto: '',
    privacy: false
  })
  const [formErrors, setFormErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const heroCtaRef = useRef(null)
  const heroCtaInView = useInView(heroCtaRef, { margin: '0px 0px -40px 0px' })
  const [scrolledPastTop, setScrolledPastTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolledPastTop(window.scrollY > 320)
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

  // SEO metadata for Offerta Influencer landing page
  useEffect(() => {
    const previousTitle = document.title
    document.title = 'Offerta Influencer | Mobilitas Studio Osteopatico Torino'

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

    const description = 'Offerta esclusiva per chi arriva dagli influencer: 50% di sconto sul trattamento osteopatico con codice sconto. Da 90€ a 45€. Prenota ora con il codice del tuo influencer preferito.'
    const pageUrl = `${window.location.origin}/offerta-influencer`

    // Standard SEO
    ensureMetaByName('description', description)
    ensureMetaByName('robots', 'index, follow')
    ensureMetaByName('keywords', 'offerta influencer, trattamento osteopatico influencer, osteopata torino influencer, collaborazione influencer')

    // Open Graph
    ensureMetaByProperty('og:title', 'Offerta Influencer | Mobilitas Studio Osteopatico Torino')
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

    setIsSubmitting(true)
    setSubmitError('')

    const { prefissoCellulare, cellulare } = parseCellulare(formData.cellulare)
    const codiceSconto = formData.codiceSconto.trim()
    const body = {
      nome: cleanName(formData.nome),
      cognome: cleanName(formData.cognome),
      email: formData.email.trim(),
      prefissoCellulare,
      cellulare,
      statusRichiesta: 'LEAD',
      fonteString: 'INFLUENCER_MARKETING',
      leadMagnetString: 'COUPON45',
      leadMagnetRequestedString: 'COUPON45',
      note: `codice sconto inserito: ${codiceSconto}`
    }

    try {
      const response = await fetch(`${API_BASE}/api/richieste`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })

      const json = await response.json()
      if (!response.ok || !json.success) {
        throw new Error(json.error || json.message || `Errore ${response.status}`)
      }

      navigate('/offerta-influencer-conferma')
    } catch (error) {
      console.error('API richieste:', error)
      setSubmitError(error.message || 'Si è verificato un errore durante l\'invio. Riprova.')
      setIsSubmitting(false)
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
  const shownCode = formData.codiceSconto.trim().toUpperCase()

  return (
    <PageShell className="mx-oinf">
      <LeadFormSheet
        open={showForm}
        onClose={() => setShowForm(false)}
        tone="inf"
        title="Prenota con il tuo codice sconto"
        intro={
          <>
            Compila il form inserendo il <b>codice sconto</b> che ti ha dato il tuo influencer.
            Dopo l'invio, la nostra segreteria ti contatterà per confermare l'appuntamento e applicare lo sconto del 50%! 🎉
          </>
        }
        formData={formData}
        formErrors={formErrors}
        onChange={handleInputChange}
        onSubmit={handleFormSubmit}
        isSubmitting={isSubmitting}
        submitError={submitError}
        extraField={
          <div className="mx-dlg-field">
            <input
              type="text"
              name="codiceSconto"
              placeholder="Inserisci il codice sconto del tuo influencer"
              value={formData.codiceSconto}
              onChange={handleInputChange}
              autoComplete="off"
              className={`mx-dlg-input ${formErrors.codiceSconto ? 'is-error' : ''}`}
            />
            {formErrors.codiceSconto && <p className="mx-lsh__err">{formErrors.codiceSconto}</p>}
            <p className="mx-lsh__hint">Il codice sconto ti permette di ottenere il 50% di sconto (45€ invece di 90€)</p>
          </div>
        }
      />

      {/* ============ APERTURA: il buono ============ */}
      <header className="mx-oinf-hero">
        <div className="mx-oinf-hero__confetti" aria-hidden="true">
          {Array.from({ length: 14 }, (_, i) => (
            <i key={i} style={{ '--i': i }} />
          ))}
        </div>
        <div className="mx-wrap mx-oinf-hero__grid">
          <div className="mx-oinf-hero__copy">
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }}>
              <Kicker>Offerta Esclusiva</Kicker>
            </motion.div>
            <h1 className="mx-h mx-oinf-hero__title">
              <MaskLines
                immediate
                delay={0.1}
                lines={[{ text: 'Hai il Codice Sconto del Tuo' }, { text: 'Influencer Preferito?', className: 'mx-oinf-hl' }]}
              />
            </h1>
          </div>

          <motion.div
            className="mx-oinf-hero__ticket"
            initial={{ opacity: 0, y: 40, rotate: 4 }}
            animate={{ opacity: 1, y: 0, rotate: -1.5 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.25 }}
          >
            <Coupon code={formData.codiceSconto} onCodeChange={handleInputChange} onSubmit={openForm} />
          </motion.div>

          <motion.div
            className="mx-oinf-hero__cta"
            ref={heroCtaRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.45 }}
          >
            <BookButton lines={['PRENOTA CON IL TUO', 'CODICE SCONTO INFLUENCER -50%']} onClick={openForm} />
          </motion.div>

          <motion.div
            className="mx-oinf-hero__more"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.6 }}
          >
            <p className="mx-lead mx-oinf-hero__lead">
              Inserisci il <strong>codice sconto</strong> che ti ha dato il tuo influencer e accedi al <strong className="mx-oinf-mark">50% di sconto</strong> sul trattamento osteopatico.
              Un'offerta esclusiva riservata solo a chi arriva tramite i nostri partner influencer.
            </p>
          </motion.div>
        </div>

        {/* Cosa include: i vantaggi della community */}
        <div className="mx-wrap">
          <ul className="mx-oinf-perks">
            {benefits.map((benefit, i) => (
              <Reveal as="li" key={benefit} delay={(i % 3) * 0.06}>
                <span className="mx-oinf-perks__tick"><Check size={14} strokeWidth={3} /></span>
                {benefit}
              </Reveal>
            ))}
          </ul>
        </div>
      </header>

      {/* ============ PROBLEMI ============ */}
      <section className="mx-section mx-oinf-problems">
        <div className="mx-wrap">
          <Kicker n="01">Problemi che Risolviamo</Kicker>
          <h2 className="mx-h mx-h--lg">
            <MaskLines lines={[{ text: 'I problemi che trattiamo' }, { text: 'e risolviamo', className: 'mx-oinf-hl' }]} />
          </h2>
          <Reveal>
            <p className="mx-lead mx-oinf-problems__lead">
              Specializzati in tutte le aree del corpo, trattiamo ogni tipo di problema con approcci osteopatici mirati e personalizzati 💪🏼
            </p>
          </Reveal>

          <div className="mx-oinf-swipe mx-oinf-mobile">
            <ArrowLeft size={16} />
            <span>Scorri per vedere tutte le aree</span>
            <ArrowRight size={16} />
          </div>

          <Snap as="ul" className="mx-oinf-areas">
            {bodyAreas.map((area, index) => {
              const Icon = area.icon
              return (
                <li key={area.title} className="mx-oinf-area" style={{ '--r': `${index % 2 ? 1.2 : -1.2}deg` }}>
                  <span className="mx-oinf-area__top">
                    <span className="mx-oinf-area__icon"><Icon size={22} /></span>
                    <span className="mx-oinf-area__n">{String(index + 1).padStart(2, '0')}</span>
                  </span>
                  <h3 className="mx-h mx-h--sm">{area.title}</h3>
                  <span className="mx-oinf-area__tags">
                    {area.problems.slice(0, 8).map((problem) => (
                      <span key={problem}>{problem}</span>
                    ))}
                  </span>
                  {area.problems.length > 8 && (
                    <span className="mx-oinf-area__more">
                      +{area.problems.length - 8} altri problemi...
                    </span>
                  )}
                </li>
              )
            })}
          </Snap>

          <div className="mx-oinf-areas__foot mx-oinf-mobile">
            <span>
              {bodyAreas.length} aree disponibili
            </span>
            <span className="mx-oinf-areas__hold">
              👆 Tieni premuto e scorri per navigare
            </span>
          </div>

          {/* Specialisti */}
          <Reveal className="mx-oinf-spec">
            <div>
              <span className="mx-oinf-spec__icon"><Stethoscope size={24} /></span>
              <h3 className="mx-h mx-h--md">Osteopati Specializzati per Ogni Area</h3>
              <p className="mx-body">
                Il nostro team di osteopati è specializzato in diverse aree per garantirti il trattamento più efficace:
              </p>
            </div>
            <ul className="mx-oinf-spec__chips">
              {specializations.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="mx-oinf-center">
            <BookButton lines={['PRENOTA CON IL TUO', 'CODICE SCONTO -50%']} onClick={openForm} />
          </Reveal>
        </div>
      </section>

      {/* ============ DOVE SIAMO ============ */}
      <section className="mx-section mx-section--deep mx-oinf-where">
        <div className="mx-wrap mx-oinf-where__grid">
          <div>
            <Kicker n="02">Dove Siamo</Kicker>
            <h2 className="mx-h mx-h--lg">
              <MaskLines lines={[{ text: 'Vieni a trovarci' }, { text: 'nel cuore di Torino', className: 'mx-oinf-hl' }]} />
            </h2>
            <Reveal>
              <p className="mx-lead mx-oinf-where__lead">
                Il nostro studio si trova in una posizione strategica nel centro di Torino,
                facilmente raggiungibile con i mezzi pubblici e con parcheggio nelle vicinanze.
              </p>
            </Reveal>
            <Reveal className="mx-oinf-where__facts">
              <span><MapPin size={18} />Via Peyron 54, Torino</span>
              <span><TrainFront size={18} />Metro: comodissimo da Bernini o Principi d'Acaja</span>
              <span><CarFront size={18} />2 parcheggi nelle vicinanze + strisce blu</span>
            </Reveal>
            <Reveal className="mx-oinf-where__cta">
              <BookButton lines={['PRENOTA CON CODICE SCONTO', '45€ invece di 90€']} onClick={openForm} className="mx-oinf-cta--cream" />
            </Reveal>
          </div>
          <Reveal className="mx-oinf-where__map" delay={0.1}>
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
          </Reveal>
        </div>
      </section>

      {/* Dock su telefono: il buono in miniatura */}
      <AnimatePresence>
        {showDock && (
          <motion.div
            className="mx-oinf-dock"
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 120, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
          >
            <button type="button" className="mx-oinf-dock__btn" onClick={openForm}>
              <span className="mx-oinf-dock__stub">
                <Gift size={16} />
                {shownCode ? <b>{shownCode}</b> : <b>45€</b>}
              </span>
              <span className="mx-oinf-dock__txt">
                <span>PRENOTA CON IL TUO</span>
                <span>CODICE SCONTO -50%</span>
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </PageShell>
  )
}

export default OffertaInfluencer
