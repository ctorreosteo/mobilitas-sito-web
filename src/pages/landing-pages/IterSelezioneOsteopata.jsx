import { useEffect, useRef, useState } from 'react'
import { MotionConfig, motion, useInView, useScroll, useSpring } from 'framer-motion'
import {
  Building2,
  UserX,
  Wallet,
  GraduationCap,
  Briefcase,
  Users,
  TrendingUp,
  Rocket,
  HeartHandshake,
  Sparkles,
  Zap,
  MessageCircle,
  Stethoscope,
  Handshake,
  Play,
  MapPin,
} from 'lucide-react'
import { Kicker, MaskLines, Reveal } from '../../components/home-sections/HomeKit'
import { EASE } from '../../components/home-sections/homeMotion'
import '../../styles/mx.css'
import '../../styles/pages/iter-selezione.css'

// In dev: '' così la chiamata va a /api/... e il proxy Vite la inoltra al backend locale.
// In prod: base completa del backend HQ (CORS pubblico abilitato per studiomobilitas.it).
const API_BASE = import.meta.env.DEV ? '' : (import.meta.env.VITE_API_BASE ?? 'https://hq.studiomobilitas.it')

// Codice del video nel gestionale: mai hardcodare l'UID Cloudflare,
// così il video si può sostituire dal gestionale senza deploy del sito.
const VIDEO_CODICE = 'ITER_SELEZIONE_VSL'

// Recupera l'UID Cloudflare del video dal backend tramite codice.
// Ritorna null se il video non esiste o è disattivato (404): in quel caso il player mostra il placeholder.
function useVideoIterSelezione() {
  const [video, setVideo] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()
    fetch(`${API_BASE}/api/sito/video/codice/${VIDEO_CODICE}`, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (json?.success && json?.data?.cloudflareUid) setVideo(json.data)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
    return () => controller.abort()
  }, [])

  return { video, loading }
}

const painPoints = [
  {
    icon: Building2,
    title: 'Un muro, tante stanze',
    description: (
      <>
        Spesso &quot;studio&quot; significa solo <strong>condividere un muro</strong>: ognuno nella
        propria stanza, ognuno per conto suo. Nessuna direzione comune, nessun reparto che ti
        sostiene: <em>solo affitti e silenzi</em>.
      </>
    ),
  },
  {
    icon: UserX,
    title: 'Il dubbio che resta dentro',
    description: (
      <>
        Hai un caso difficile e <strong>non hai nessuno a cui chiedere</strong>. Nessun collega
        che ti guardi lavorare, nessuno con cui confrontarti dopo la visita. La solitudine{' '}
        <em>non è solo emotiva</em>: è anche clinica.
      </>
    ),
  },
  {
    icon: Wallet,
    title: 'Paghi per lavorare',
    description: (
      <>
        Affitti la stanza o cedi una <strong>percentuale su ogni paziente</strong> prima ancora di
        guadagnare. Il rischio economico è tutto tuo,{' '}
        <em>mentre lo studio incassa comunque</em>.
      </>
    ),
  },
  {
    icon: GraduationCap,
    title: 'Anni per sentirti pronto',
    description: (
      <>
        Dopo la laurea <strong>ricostruisci tutto da capo</strong>: pochi casi, pochi feedback,
        tanta incertezza. Quando finalmente ti senti competente,{' '}
        <em>sono passati anni che non tornano indietro</em>.
      </>
    ),
  },
  {
    icon: Briefcase,
    title: 'Osteopata solo a metà',
    description: (
      <>
        <strong>Fatture, agenda, disdette, post sui social…</strong> La giornata si riempie di
        compiti che <em>non c&apos;entrano con le mani</em>, e il tempo per i pazienti si
        assottiglia sempre di più.
      </>
    ),
  },
  {
    icon: Users,
    title: 'Colleghi, non compagni',
    description: (
      <>
        Ti salutano in corridoio, ma il rapporto finisce lì. Quando serve aiuto,{' '}
        <strong>ognuno guarda il proprio carnet</strong>. Non è malizia: è il modello,{' '}
        <em>competizione mascherata da convivenza</em>.
      </>
    ),
  },
]

const benefits = [
  {
    icon: TrendingUp,
    title: 'Clinica fin dal giorno uno',
    description: (
      <>
        <strong>Pazienti in agenda</strong> già nelle prime settimane, non tra qualche anno.{' '}
        <strong>10, 20, 30 visite a settimana</strong>, casi che variano ogni giorno:{' '}
        <em>acufeni, cervicalgie, vertigini, lombalgie, pubalgie e tantissimo altro</em>. Esperienza che altrove si
        accumula in silenzio, qui <strong>la vivi subito</strong>.
      </>
    ),
  },
  {
    icon: Rocket,
    title: 'Una carriera che si vede',
    description: (
      <>
        Il percorso di crescita è <strong>concreto</strong>:{' '}
        <strong>Osteopata Senior, Team Leader, Manager, Area Manager, Direttore degli studi</strong>.
        Una possibilità di crescita <em>enorme</em> che <strong>non esiste da altre parti</strong>.{' '}
        <em>Meritocratica</em> per chi vuole acquisire{' '}
        <strong>competenza e responsabilità importanti</strong>.
      </>
    ),
  },
  {
    icon: HeartHandshake,
    title: 'Mai solo davanti al paziente',
    description: (
      <>
        Visite affiancate, discussione dei casi, cene di team, formazione continua,{' '}
        <em>clinica e umana</em>. Qui il confronto non è un optional: è{' '}
        <strong>parte del modo di lavorare</strong>, ogni giorno.
      </>
    ),
  },
  {
    icon: Sparkles,
    title: 'Le tue idee, sul tavolo',
    description: (
      <>
        Corsi, partnership, eventi istituzionali, e soprattutto spazio per i{' '}
        <strong>tuoi progetti</strong>. Se hai un&apos;idea concreta,{' '}
        <em>non resta nel cassetto</em>: la portiamo in azienda e la valutiamo insieme.
      </>
    ),
  },
  {
    icon: Zap,
    title: 'Tu curi, noi organizziamo',
    description: (
      <>
        Gestionale dedicato, processi automatizzati, segreteria e amministrazione che girano{' '}
        <strong>senza rubarti tempo</strong>. La tua energia va ai pazienti,{' '}
        <em>non alla burocrazia</em>.
      </>
    ),
  },
  {
    icon: MessageCircle,
    title: 'Un posto dove restare',
    description: (
      <>
        Lavoriamo ogni giorno perché ti senta <strong>ascoltato, rispettato e a tuo agio</strong>.
        È un clima che si capisce <em>dal primo colloquio</em>, e che fa la differenza nel
        lungo periodo.
      </>
    ),
  },
]

const iterSteps = [
  {
    step: 1,
    icon: MessageCircle,
    title: 'Primo colloquio',
    subtitle: 'Chi sei, cosa cerchi',
    description: (
      <>
        Ci incontriamo <strong>dal vivo o in videochiamata</strong>. Vogliamo capire{' '}
        <em>chi sei al di là del curriculum</em>: obiettivi, carattere, cosa ti motiva e che
        valore puoi portare in azienda. È un momento di <strong>reciproca scoperta</strong>, per
        entrambi.
      </>
    ),
  },
  {
    step: 2,
    icon: Stethoscope,
    title: 'Secondo colloquio',
    subtitle: 'Le mani sul campo',
    description: (
      <>
        <strong>Visita osteopatica reale</strong> con un paziente, sotto supervisione del manager,
        team leader o direttore. Guardiamo <em>ragionamento clinico</em>,{' '}
        <em>competenza manuale</em> e <em>rapporto con il paziente</em>. Se non c&apos;è un
        paziente disponibile, procediamo con simulazioni o ragionamento clinico: tieniti pronto/a
        con <strong>camice, ciabatte, computer, carta e penna</strong>.
      </>
    ),
  },
  {
    step: 3,
    icon: Handshake,
    title: 'Terzo colloquio',
    subtitle: 'La proposta',
    description: (
      <>
        Ti presentiamo l&apos;<strong>offerta definitiva</strong>e scegliamo insieme orari e condizioni. È il
        momento di fare <strong>tutte le domande</strong> che ti sei tenuto/a dentro:{' '}
        <em>nessun dubbio resta senza risposta</em>.
      </>
    ),
  },
]

// Concetto: "la linea". Il percorso di selezione disegnato come una linea della metro:
// in apertura le tre fermate (toccabili, portano al dettaglio), in fondo la linea si accende
// fermata dopo fermata mentre scorri, fino al capolinea "A presto in studio!".

const PAIN_CARD_WIDTH = 300
const PAIN_CARD_GAP = 20

const scrollToStep = (n) => {
  const el = document.getElementById(`iter-step-${n}`)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

function Station({ step, index }) {
  const ref = useRef(null)
  const reached = useInView(ref, { once: true, margin: '0px 0px -45% 0px' })
  const Icon = step.icon
  return (
    <li ref={ref} id={`iter-step-${step.step}`} className={`mx-iter-stop ${reached ? 'is-reached' : ''}`}>
      <span className="mx-iter-stop__dot" aria-hidden="true">
        <span>{step.step}</span>
      </span>
      <motion.div
        className="mx-iter-stop__card"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        transition={{ duration: 0.9, ease: EASE, delay: index * 0.05 }}
      >
        <div className="mx-iter-stop__head">
          <span className="mx-iter-stop__ic"><Icon size={22} strokeWidth={2.2} /></span>
          <div>
            <h3 className="mx-h mx-iter-stop__title">{step.title}</h3>
            <span className="mx-iter-stop__sub">{step.subtitle}</span>
          </div>
        </div>
        <p className="mx-iter-rich">{step.description}</p>
      </motion.div>
    </li>
  )
}

export default function IterSelezioneOsteopata() {
  const { video, loading } = useVideoIterSelezione()
  const painCarouselRef = useRef(null)
  const [painIndex, setPainIndex] = useState(0)
  const lineRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: lineRef, offset: ['start 0.6', 'end 0.6'] })
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 24 })

  const videoEmbedUrl = video
    ? `https://iframe.videodelivery.net/${video.cloudflareUid}?preload=metadata&poster=${encodeURIComponent(video.anteprimaUrl ?? '')}`
    : ''

  // Durante il caricamento mostriamo il placeholder; se il backend risponde 404
  // (video inesistente o disattivato) nascondiamo del tutto la sezione video.
  const showVideoFrame = loading || Boolean(video)

  useEffect(() => {
    const el = painCarouselRef.current
    if (!el) return
    const onScroll = () => {
      const index = Math.round(el.scrollLeft / (PAIN_CARD_WIDTH + PAIN_CARD_GAP))
      setPainIndex(Math.min(Math.max(index, 0), painPoints.length - 1))
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToPain = (index) => {
    if (painCarouselRef.current) {
      painCarouselRef.current.scrollTo({
        left: index * (PAIN_CARD_WIDTH + PAIN_CARD_GAP),
        behavior: 'smooth',
      })
    }
    setPainIndex(index)
  }

  return (
    <MotionConfig reducedMotion="user">
      <div className={`mx-page mx-iter ${showVideoFrame ? '' : 'mx-iter--novideo'}`}>
        {/* HERO */}
        <section className="mx-iter-hero">
          <div className="mx-iter-hero__grid" aria-hidden="true" />
          <div className="mx-wrap mx-iter-hero__layout">
            <div className="mx-iter-hero__copy">
              <Kicker>Iter di selezione</Kicker>
              <h1 className="mx-h mx-iter-hero__title">
                <MaskLines
                  immediate
                  lines={[
                    { text: 'Cari osteopati 👋' },
                    { text: 'Ecco cosa vi aspetta', className: 'mx-accent' },
                  ]}
                />
              </h1>
              <motion.p
                className="mx-lead mx-iter-hero__lead"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.35 }}
              >
                {showVideoFrame
                  ? 'Prima dei colloqui, guarda questo video: ti raccontiamo chi siamo, come selezioniamo e perché da noi le cose funzionano diversamente 👇🏼'
                  : 'Prima dei colloqui, ecco tutto quello che devi sapere: chi siamo, come selezioniamo e perché da noi le cose funzionano diversamente 📋'}
              </motion.p>
            </div>

            {/* Video frame: nascosto se il video non esiste o è disattivato dal gestionale */}
            {showVideoFrame && (
              <motion.div
                className="mx-iter-video"
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1, ease: EASE, delay: 0.4 }}
              >
                <div className="mx-iter-video__frame">
                  {videoEmbedUrl ? (
                    <iframe
                      src={videoEmbedUrl}
                      frameBorder="0"
                      allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
                      referrerPolicy="strict-origin-when-cross-origin"
                      title={video?.titolo || 'Iter di selezione Mobilitas'}
                    />
                  ) : (
                    <div className="mx-iter-video__wait">
                      <span><Play size={30} strokeWidth={2.2} /></span>
                      <p>Caricamento video…</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Le tre fermate: anteprima del percorso, portano al dettaglio */}
            <motion.nav
              className="mx-iter-route"
              aria-label="Il percorso di selezione"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.55 }}
            >
              <span className="mx-iter-route__line" aria-hidden="true">
                <motion.i initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.6, ease: EASE, delay: 0.8 }} />
              </span>
              {iterSteps.map((s, i) => (
                <motion.button
                  key={s.step}
                  type="button"
                  className="mx-iter-route__stop"
                  onClick={() => scrollToStep(s.step)}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.9 + i * 0.25 }}
                >
                  <span className="mx-iter-route__n">{s.step}</span>
                  <span className="mx-iter-route__t">{s.title}</span>
                  <span className="mx-iter-route__s">{s.subtitle}</span>
                </motion.button>
              ))}
            </motion.nav>
          </div>
        </section>

        {/* PAIN SECTION */}
        <section className="mx-section mx-section--deep mx-iter-pain">
          <div className="mx-wrap">
            <Reveal className="mx-iter-head">
              <p className="mx-iter-badge mx-iter-badge--red">Le altre realtà</p>
              <h2 className="mx-h mx-h--lg">
                Gli altri studi sono così.{' '}
                <span className="mx-accent">Noi no.</span>
              </h2>
              <p className="mx-lead mx-iter-head__lead">
                Se hai già cercato lavoro in altri studi, riconoscerai almeno uno di questi scenari. Sono
                esattamente ciò che abbiamo scelto di non replicare 😔
              </p>
            </Reveal>

            <div className="mx-iter-pain__rail">
              <div ref={painCarouselRef} className="mx-iter-pain__track">
                {painPoints.map((point, index) => {
                  const Icon = point.icon
                  return (
                    <div key={point.title} className="mx-iter-pcard">
                      <span className="mx-iter-pcard__n">0{index + 1}</span>
                      <span className="mx-iter-pcard__ic"><Icon size={22} strokeWidth={2.2} /></span>
                      <h3 className="mx-h mx-iter-pcard__title">{point.title}</h3>
                      <p className="mx-iter-rich">{point.description}</p>
                    </div>
                  )
                })}
              </div>

              <div className="mx-iter-dots">
                {painPoints.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => scrollToPain(index)}
                    className={index === painIndex ? 'is-on' : ''}
                    aria-label={`Vai al punto ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* BENEFITS SECTION */}
        <section className="mx-section mx-section--glow mx-iter-ben">
          <div className="mx-wrap">
            <Reveal className="mx-iter-head">
              <p className="mx-iter-badge">Il lato Mobilitas</p>
              <h2 className="mx-h mx-h--lg">
                Stesso mestiere,{' '}
                <span className="mx-accent">mondo opposto</span>
              </h2>
              <p className="mx-lead mx-iter-head__lead">
                Non promesse generiche: ecco cosa cambia concretamente quando entri in azienda con
                noi ✨
              </p>
            </Reveal>

            <div className="mx-iter-ben__grid">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon
                return (
                  <motion.article
                    key={benefit.title}
                    className="mx-iter-bcard"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '0px 0px -8% 0px' }}
                    transition={{ duration: 0.9, ease: EASE, delay: (index % 2) * 0.08 }}
                  >
                    <span className="mx-iter-bcard__ic"><Icon size={24} strokeWidth={2.2} /></span>
                    <h3 className="mx-h mx-iter-bcard__title">{benefit.title}</h3>
                    <p className="mx-iter-rich">{benefit.description}</p>
                  </motion.article>
                )
              })}
            </div>
          </div>
        </section>

        {/* ITER SECTION */}
        <section className="mx-section mx-section--deep mx-iter-path">
          <div className="mx-wrap mx-iter-path__wrap">
            <Reveal className="mx-iter-head">
              <p className="mx-iter-badge">Il percorso di selezione</p>
              <h2 className="mx-h mx-h--lg">
                Tre colloqui,{' '}
                <span className="mx-accent">zero sorprese 🤝</span>
              </h2>
              <p className="mx-lead mx-iter-head__lead">
                Ogni step ha uno scopo preciso: capirci, vederti all&apos;opera, chiudere con
                chiarezza. Ecco cosa succede in ciascuno.
              </p>
            </Reveal>

            <div ref={lineRef} className="mx-iter-line">
              <span className="mx-iter-line__track" aria-hidden="true">
                <motion.i style={{ scaleY: fill }} />
              </span>
              <ol className="mx-iter-line__stops">
                {iterSteps.map((step, index) => (
                  <Station key={step.step} step={step} index={index} />
                ))}
              </ol>

              {/* Capolinea */}
              <Reveal className="mx-iter-end">
                <span className="mx-iter-end__pin" aria-hidden="true"><MapPin size={22} strokeWidth={2.4} /></span>
                <h3 className="mx-h mx-iter-end__title">
                  Arriva con curiosità, non con ansia
                </h3>
                <p>
                  I colloqui servono a capire se siamo la scelta giusta per entrambi. Porta le tue
                  domande, mostra chi sei sul serio: se c&apos;è match, il resto viene da sé.
                </p>
                <p className="mx-iter-end__bye">
                  A presto in studio! 👋
                </p>
              </Reveal>
            </div>
          </div>
        </section>
      </div>
    </MotionConfig>
  )
}
